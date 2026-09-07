#!/usr/bin/env bash
# Convert the Flow clips in source-video/ into the assets the page ships.
#
# Why it works this way:
#   Veo can't output transparency, and its backdrop comes back light grey
#   (~217 on bloom, ~207 on bleed) rather than white — so compositing it
#   straight onto the page leaves a visible haze rectangle. So:
#     1. colorlevels pushes the white point until the backdrop clips to white
#     2. a curve hard-clips everything above the backdrop to pure 255
#     3. negate flips it to white ink on pure black
#   The frames then composite with `mix-blend-mode: screen`, which drops pure
#   black entirely and leaves only the ink glowing on the dark ground. Verified:
#   backdrop lands on exactly 0,0,0, so there is no lift and no rectangle edge.
#
#   (For a light theme, drop the negate and switch the CSS to multiply — the
#   clipped-to-white frames composite the same way in reverse.)
#
#   Baking an actual alpha channel also works and was tried, but libwebp
#   encodes alpha losslessly — dendritic ink came out at ~180KB/frame versus
#   25KB here, for no visible gain.
#
#   The Flow sparkle watermark sits brighter than the backdrop on the three
#   scrubbed shots, so step 1 clips it away for free. The studio clip is a real
#   scene and can't use that trick, so it gets cropped instead.
#
# Usage:  bash scripts/make-frames.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if command -v ffmpeg >/dev/null 2>&1; then
  FF=ffmpeg
else
  FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
fi
echo "ffmpeg: $FF"

# shot <src> <name> <fps> <width> <white-point> <clip>
#   white-point = input level stretched to white (from that clip's own backdrop)
#   clip        = everything at or above this is forced to pure 255
shot() {
  local src=$1 name=$2 fps=$3 w=$4 wp=$5 clip=$6
  local out="public/frames/$name"
  echo "→ $name  ${fps}fps ${w}px  white-point ${wp}  clip ${clip}"
  rm -rf "$out"; mkdir -p "$out"
  "$FF" -hide_banner -loglevel error -i "source-video/$src" \
    -vf "fps=${fps},scale=${w}:-2,\
colorlevels=rimax=${wp}:gimax=${wp}:bimax=${wp},\
curves=all='0/0 ${clip}/1 1/1',negate" \
    -c:v libwebp -quality 74 -compression_level 4 \
    -y "$out/f-%03d.webp"
  echo "   $(ls "$out" | wc -l | tr -d ' ') frames · $(du -sh "$out" | cut -f1)"
}

shot 01-bloom.mp4   bloom   15 1400 0.80 0.78
shot 03-bleed.mp4   bleed   12 1100 0.78 0.76

# The studio clip plays normally, so it stays a video. Crop away the
# bottom-right watermark, then rescale back up to a clean width.
echo "→ room  (mp4, watermark cropped)"
mkdir -p public/video
"$FF" -hide_banner -loglevel error -i source-video/04-room.mp4 \
  -vf "crop=iw*0.88:ih*0.85:0:0,scale=1200:-2" \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
  -y public/video/04-room.mp4
echo "   $(du -sh public/video/04-room.mp4 | cut -f1)"

echo
echo "done · $(du -sh public/frames | cut -f1) of frames, $(du -sh public/video | cut -f1) of video"
