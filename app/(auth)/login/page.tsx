"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

async function loginUser(email: string, password: string) {
  if (
    (email === "admin@admin.com" && password === "admin123") ||
    (email === "Sincere@april.biz" && password === "admin123")
  ) {
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

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  searchParams?: Record<string, string>; // Keep the searchParams type here if needed in logic
}

export default function LoginForm({
  className,
  searchParams, // Accept it in props but do not pass it to the DOM
  ...props
}: LoginFormProps) {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md mt-10">
        <form
          onSubmit={handleLogin}
          className={cn(
            "flex flex-col gap-6 max-w-md w-full mx-auto",
            className
          )}
          {...props} // Spread other props here, but not `searchParams`
        >
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative z-10 bg-background px-2 text-sm text-muted-foreground">
                Or continue with
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 
                    3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 
                    1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 
                    0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                    0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 
                    3-.405 1.02.006 2.04.138 3 
                    .405 2.28-1.552 3.285-1.23 
                    3.285-1.23.645 1.653.24 2.873.12 
                    3.176.765.84 1.23 1.91 
                    1.23 3.22 0 4.61-2.805 5.625-5.475 
                    5.92.42.36.81 1.096.81 2.22 
                    0 1.606-.015 2.896-.015 
                    3.286 0 .315.21.69.825.57C20.565 
                    22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Login with GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </form>
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
