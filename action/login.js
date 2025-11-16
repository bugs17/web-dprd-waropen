"use server";

import { prisma } from "@/lib/db";
import { setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function login(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) return { error: "Username salah" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Password salah" };

    // Set session cookie
    setSession(user.id);

    return { success: true };
}
