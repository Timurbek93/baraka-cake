import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const CART_SESSION_COOKIE = "cart_session";

export async function getOrCreateCartSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_SESSION_COOKIE)?.value;
  if (existing) return existing;

  const id = randomUUID();
  store.set(CART_SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return id;
}

