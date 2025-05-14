'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import UsersNavbar from "../../components/users/UsersNavbar";
import { Team } from "../../components/users/Team";
import { About } from "../../components/users/About";
import { Contact } from "../../components/users/Contact";
import { Footer } from "../../components/Footer";
import withAuth from "../../hoc/withAuth";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const RegularUserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

      const newPost = localStorage.getItem("newPost");
      if (newPost) {
        const parsedPost = JSON.parse(newPost);
        userPosts.unshift(parsedPost);
        localStorage.removeItem("newPost");
      }

      setPosts(userPosts);
      setLoading(false);
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleDelete = async (postId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });

      setPosts(posts.filter((post) => post.id !== postId));
      window.alert("Post deleted successfully.");
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
        <div className="max-w-7xl mx-auto py-10 px-4 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
            <Link
              href="/dashboard/user/post/create_posts"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white-900 bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Post
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-500">You have no posts.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-6">
                    <Link href={`/dashboard/user/post/${post.id}`}>
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600">
                        {post.title}
                      </h5>
                    </Link>
                    <p className="mb-4 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                      {post.body}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <Link
                        href={`/dashboard/user/post/${post.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>

                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/user/post/edit/${post.id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 focus:outline-none"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto py-10 px-4 w-full">
          <About />
          <Team />
          <Contact />
        </div>
      </UsersNavbar>
      <Footer />
    </>
  );
};

export default withAuth(RegularUserDashboard, ["user"]);
