
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import UsersNavbar from "../../components/users/UsersNavbar";


type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function RegularUserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  
  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await res.json();


      const userPosts = data.filter((post) => post.userId === user.id);

      // Check if there's a new post in localStorage
      const newPost = localStorage.getItem("newPost");
      if (newPost) {
        const parsedPost = JSON.parse(newPost);
        userPosts.unshift(parsedPost); // Add new post to the top
        localStorage.removeItem("newPost"); // Clear after use
      }

      setPosts(userPosts);
      setLoading(false);
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);



  const handleDelete = async (postId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });
      
      setPosts(posts.filter((post) => post.id !== postId));
      window.alert("Posts is deleted successfully.")
    }
  };

  if (!user) {
    return <p className="text-center mt-10">User not logged in.</p>;
  }


  if (loading) {
    return <p className="text-center mt-10">Loading your posts...</p>;
  }

  return (
    <>
      <UsersNavbar
        user={{
          ...user,
          id: user.id.toString(),
          avatar: user.avatar || "/default-avatar.png",
        }}
      >
        <div className="max-w-4xl mx-auto py-10 px-4 w-full">
          <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
          <h2 className="text-xl mb-4">Posts</h2>

          {/* Create Post Button */}
          <Link
            href="/dashboard/user/post/create_posts"
            className="bg-blue-600 text-white px-6 py-3 rounded-md mb-6 inline-block"
          >
            Create Post
          </Link>

          {posts.length === 0 ? (
            <p className="text-gray-500">You have no posts.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                  <Link href={`/dashboard/user/post/${post.id}`}>
                    <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700 mt-1">{post.body}</p>


                  <div className="mt-4 flex space-x-4">
                    {/* Edit Button */}
                    <Link
                      href={`/dashboard/user/post/edit/${post.id}`}
                      className="px-2 py-2 text-blue-500 hover:text-blue-600"
                    >
                      Edit
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-2 py-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </UsersNavbar>
    </>
  );
}
