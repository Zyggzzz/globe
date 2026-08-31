import { cookies } from "next/headers";

export async function setCookie(name: string, value: string, options?: { maxAge?: number }) {
  const jar = await cookies();
  jar.set(name, value, options);
}

export async function getCookie(name: string) {
  const jar = await cookies();
  return jar.get(name);
}
