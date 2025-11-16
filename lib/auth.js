import { cookies } from "next/headers";

export function setSession(userId) {
  cookies().set({
    name: "session",
    value: userId,
    httpOnly: true,
    secure: true,
    path: "/"
  });
}

export function clearSession() {
  cookies().delete("session");
}

export function getSession() {
  return cookies().get("session")?.value || null;
}
