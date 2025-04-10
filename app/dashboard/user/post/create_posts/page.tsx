

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UsersNavbar from "./../../../../components/users/UsersNavbar";


// Define the User type based on your structure
type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const newPost = {
      userId: user.id,
      title,
      body,
    };

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.id) {
      // Store new post in localStorage
      localStorage.setItem("newPost", JSON.stringify({ ...data, userId: user.id }));

      // Redirect to dashboard
      router.push("/dashboard/user");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading user info...</p>;

  return (
    <UsersNavbar
      user={{
        ...user,
        id: user.id.toString(),
        avatar: user.avatar || "/default-avatar.png",
      }}
    >
      <div className="max-w-4xl mx-auto py-10 px-4 w-full">
        <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Post
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/user")}
              className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </UsersNavbar>
  );
}
