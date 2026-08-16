import { comingSoonPath } from "@/content/paths";

export const origin = "https://aalborgmartialarts.dk";

export function soonHref(side?: string) {
  if (!side) return comingSoonPath;
  return `${comingSoonPath}?side=${encodeURIComponent(side)}`;
}

export const geo = {
  latitude: 57.0506,
  longitude: 9.9222,
  maps: "https://maps.google.com/?q=Teglg%C3%A5rds+Plads+1,+9000+Aalborg",
  reviews:
    "https://www.google.com/maps/search/?api=1&query=Aalborg+Martial+Arts+Nordkraft",
} as const;

export const site = {
  name: "Aalborg Martial Arts",
  shortName: "AMA",
  email: "info@aalborgmartialarts.dk",
  phone: "+45 21 98 51 57",
  cvr: "CVR 00000000",
  address: {
    line1: "Teglgårds Plads 1",
    line2: "Nordkraft, niveau 5, 9000 Aalborg",
  },
  facebook: "https://www.facebook.com/aalborgmartialarts",
  instagram: "https://www.instagram.com/aalborgmartialartsdk/",
  google: {
    rating: "4.9",
    reviewCount: 14,
  },
  conventus: {
    trial: "https://aalborgmartialarts.dk/medlem/",
    login: "https://aalborgmartialarts.dk/medlem/medlemslogin/",
    book: "https://aalborgmartialarts.dk/medlem/traeningsplan/",
  },
} as const;

export const weekdayIds = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export type WeekdayId = (typeof weekdayIds)[number];

export const beginnerClassIds = [
  "kids-7-10",
  "kick-thai-beginner",
  "boxing-beginner",
  "kicknburn",
] as const;

export const nextSessions = [
  { day: "mon", time: "16:00", classId: "kids-7-10", spots: "open" },
  { day: "mon", time: "17:30", classId: "kick-thai-beginner", spots: "open" },
  { day: "mon", time: "19:00", classId: "kick-thai-advanced", spots: "few" },
  { day: "tue", time: "16:00", classId: "kids-7-10", spots: "open" },
  { day: "tue", time: "17:30", classId: "boxing-beginner", spots: "open" },
  { day: "tue", time: "19:00", classId: "fight", spots: "few" },
  { day: "wed", time: "18:00", classId: "kicknburn", spots: "open" },
  { day: "wed", time: "19:15", classId: "kick-thai-beginner", spots: "open" },
  { day: "wed", time: "20:30", classId: "kick-thai-advanced", spots: "open" },
  { day: "thu", time: "16:00", classId: "kids-7-10", spots: "open" },
  { day: "thu", time: "17:30", classId: "kick-thai-beginner", spots: "open" },
  { day: "thu", time: "19:00", classId: "boxing-beginner", spots: "few" },
  { day: "fri", time: "17:00", classId: "kicknburn", spots: "open" },
  { day: "fri", time: "18:30", classId: "open-gym", spots: "open" },
  { day: "sat", time: "10:00", classId: "kids-7-10", spots: "open" },
  { day: "sat", time: "11:30", classId: "kick-thai-beginner", spots: "open" },
] as const satisfies readonly {
  day: WeekdayId;
  time: string;
  classId: string;
  spots: "open" | "few";
}[];

export const pricingTiers = [
  { id: "senior", price: 249 },
  { id: "junior", price: 99 },
  { id: "barn", price: 49 },
] as const;

export const fighterRoster = [
  { id: "charlie", image: "/fighters/fighter-04.png" },
  { id: "dilsa", image: "/fighters/fighter-02.png" },
  { id: "martin", image: "/fighters/fighter-03.png" },
  { id: "simon", image: "/fighters/fighter-05.png" },
  { id: "yousef", image: "/fighters/fighter-01.png" },
  { id: "salem", image: "/fighters/fighter-06.png" },
] as const;

export const voiceClips = [
  { id: "kristoffer", src: "/media/kristoffer.mp4" },
  { id: "holdet", src: "/media/hero-clip-a.mp4" },
  { id: "salen", src: "/media/voice-hold.mp4" },
] as const;

export const videoMedia: Record<
  string,
  { poster: string; preview?: string }
> = {
  "/media/kristoffer.mp4": {
    poster: "/media/kristoffer-poster.jpg",
    preview: "/media/kristoffer-preview.mp4",
  },
  "/media/hero-clip-a.mp4": {
    poster: "/media/hero-clip-a-poster.jpg",
    preview: "/media/hero-clip-a-preview.mp4",
  },
  "/media/voice-hold.mp4": {
    poster: "/media/voice-hold-poster.jpg",
    preview: "/media/voice-hold-preview.mp4",
  },
};

export const doorMedia = {
  begynder: { href: soonHref("begynder"), image: "/media/punch-pads.jpg" },
  barn: { href: soonHref("barn"), image: "/media/sparring.jpg" },
  kicknburn: { href: soonHref("kicknburn"), image: "/media/fairtex.jpg" },
  kamp: { href: soonHref("kamp"), image: "/media/kick-ring.jpg" },
} as const;

export const navMedia = {
  hold: {
    begynder: "/media/punch-pads.jpg",
    barn: "/media/sparring.jpg",
    kicknburn: "/media/fairtex.jpg",
    kamp: "/media/kick-ring.jpg",
  },
  start: {
    proeve: "/media/guard.jpg",
    faq: "/media/punch-pads.jpg",
    priser: "/media/hero-still.jpg",
    stemmer: "/media/kristoffer-poster.jpg",
  },
  tider: {
    ugeplan: "/media/sparring.jpg",
  },
  klubben: {
    om: "/media/nordkraft.png",
    kaempere: "/media/kick-ring.jpg",
    sponsorer: "/media/nav-club.jpg",
  },
} as const;
