"server-only";

import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

export async function makeSessionToken() {
  const bytes = randomBytes(32);
  // base64url
  const base64url = bytes.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(base64url, salt);

  return hash;
}
