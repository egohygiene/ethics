import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
export const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
export const jsonBytes = (value) => `${JSON.stringify(value, null, 2)}\n`;
export const hash = (value) => createHash("sha256").update(value).digest("hex");
export async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, jsonBytes(value));
}
