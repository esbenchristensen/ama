import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const anton = await readFile(
  join(process.cwd(), "assets/fonts/Anton-Regular.ttf"),
);

export function dataUrl(bytes: Buffer, mime: string) {
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

export async function loadLogoWhite() {
  return readFile(join(process.cwd(), "public/brand/logo-white.png"));
}

export async function loadOgFighter() {
  return readFile(join(process.cwd(), "assets/og-fighter.jpg"));
}
