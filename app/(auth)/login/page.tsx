
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function loginUser(email: string, password: string) {
  if (email === "admin@admin.com" && password === "admin123") {
    return {
      success: true,
      user: {
        id: 0,
        name: "Administrator",
        email: "admin@admin.com",
        username: "admin",
        role: "admin",
      },
    };
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  const user = users.find((u: { email: string }) => u.email === email);

  if (user) {
    if (password === "password123") {
      return {
        success: true,
        user: {
          ...user,
          role: "user",
        },
      };
    } else {
      return { success: false, message: "Incorrect password" };
    }
  } else {
    return { success: false, message: "User not found" };
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = await loginUser(email, password);

    if (result.success) {
      const user = result.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
      }

      alert(`Welcome, ${user.name}!`);

      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } else {
      setErrorMessage(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>

        <p className="mt-4 text-sm text-center">
          <Link
          href="/"
          className="inline-block mt-4 mb-6 text-blue-600 hover:text-blue-800"
        >
        Go Home
        </Link>
        </p>
      </div>
    </div>
  );
}
