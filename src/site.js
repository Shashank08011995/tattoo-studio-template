// Everything brand- and contact-specific lives here so it changes in one place.
export const BRAND = "coilbugatul";
export const ARTIST = "Atul Rana";

export const PHONE = "917876822554"; // country code + number, no + or spaces
export const PHONE_DISPLAY = "+91 78768 22554";
export const TEL_LINK = `tel:+${PHONE}`;

export const INSTAGRAM_HANDLE = "@coilbugatul";
export const INSTAGRAM_URL = "https://www.instagram.com/coilbugatul/";

export const START_YEAR = 2020;
export const YEARS = Math.max(5, new Date().getFullYear() - START_YEAR);

export const waLink = (text = "Hi Atul! I'd like a tattoo consultation.") =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Journey" },
  { to: "/work", label: "Work" },
  { to: "/consult", label: "Consult" },
  { to: "/aftercare", label: "Aftercare" },
  { to: "/contact", label: "Contact" },
];
