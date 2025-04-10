"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UsersNavbar from "../../../../../components/users/UsersNavbar";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const postData = await res.json();

      const editedPosts = JSON.parse(localStorage.getItem("editedPosts") || "[]");
      const edited = editedPosts.find((p: Post) => p.id === Number(id));

      const finalPost = edited || postData;

      if (user?.email !== "admin@admin.com" && user?.id !== finalPost.userId) {
        setPost(null);
        setLoading(false);
        return;
      }

      setPost(finalPost);
      setTitle(finalPost.title);
      setBody(finalPost.body);
      setLoading(false);
    };

    if (user) fetchPost();
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost = {
      id: post?.id,
      userId: user.id,
      title,
      body,
    };

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      const editedPosts = JSON.parse(localStorage.getItem("editedPosts") || "[]");
      const filteredPosts = editedPosts.filter((p: Post) => p.id !== post?.id);
      filteredPosts.push(updatedPost);
      localStorage.setItem("editedPosts", JSON.stringify(filteredPosts));

      alert("Post updated!");
      router.push("/dashboard/user");
    } else {
      alert("Failed to update post.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center text-red-500 mt-10">Access denied.</p>;

  return (
    <UsersNavbar
      user={{
        ...user,
        id: user.id.toString(),
        avatar: user.avatar || "/default-avatar.png",
      }}
    >
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </UsersNavbar>
  );
}
