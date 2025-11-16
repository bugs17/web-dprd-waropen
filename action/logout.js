"use server";

import { clearSession } from "@/lib/auth";

export async function logout() {
  clearSession();
}
