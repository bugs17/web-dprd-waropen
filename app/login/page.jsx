"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/action/login";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);

        // bikin FormData manual
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await login(null, formData);

        setLoading(false);

        if (res?.success) {
            router.push("/dashboard");
        } else {
            alert(res?.error || "Login gagal");
        }
    };

    return (
        <div className="max-w-sm mx-auto py-10">

            <h1 className="text-2xl font-bold mb-6">Login</h1>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border text-black p-2 w-full rounded mb-3"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border text-black p-2 w-full rounded mb-4"
            />

            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {loading ? "Memproses..." : "Login"}
            </button>
        </div>
    );
}
