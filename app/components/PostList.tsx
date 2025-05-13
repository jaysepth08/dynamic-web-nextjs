"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type User = {
  id: number;
  name: string;
  email: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Dashboard() {
  const [user] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await res.json();

      const filtered =
        user?.email === "admin@admin.com"
          ? data
          : data.filter((post) => post.userId === user?.id);

      setPosts(filtered);
      setLoading(false);
    };

    if (user) fetchPosts();
  }, [user]);
  

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;
  if (!user) return <p className="text-center mt-10">Please login.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <Link href={`/dashboard/post/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-700 mt-1">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
