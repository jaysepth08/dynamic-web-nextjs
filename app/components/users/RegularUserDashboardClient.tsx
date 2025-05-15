'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import UsersNavbar from "../../components/users/UsersNavbar";
import { Team } from "../../components/users/Team";
import { About } from "../../components/users/About";
import { Contact } from "../../components/users/Contact";
import { Footer } from "../../components/Footer";
import withAuth from "../../hoc/withAuth";
import { Loader2 } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      setError("Failed to load user data");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        
        const data: Post[] = await res.json();
        const userPosts = data.filter((post) => post.userId === user.id);

        const newPost = localStorage.getItem("newPost");
        if (newPost) {
          const parsedPost = JSON.parse(newPost);
          userPosts.unshift(parsedPost);
          localStorage.removeItem("newPost");
        }

        setPosts(userPosts);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleDelete = async (postId: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      
      if (confirmDelete) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: "DELETE",
        });
        
        if (!res.ok) throw new Error("Failed to delete post");

        setPosts(posts.filter((post) => post.id !== postId));
        window.alert("Post deleted successfully.");
      }
    } catch (err) {
      window.alert("Failed to delete post. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">User not logged in.</p>
      </div>
    );
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Manage your posts and content from your personal dashboard.
                  </p>
                </div>
                <Link
                  href="/dashboard/user/post/create_posts"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-200"
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
            </motion.div>

            {/* Posts Section */}
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-600 dark:text-gray-300">You haven't created any posts yet.</p>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                      >
                        <div className="p-6">
                          <Link href={`/dashboard/user/post/${post.id}`}>
                            <h5 className="mb-3 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200">
                              {post.title}
                            </h5>
                          </Link>
                          <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                            {post.body}
                          </p>

                          <div className="flex justify-between items-center mt-6">
                            <Link
                              href={`/dashboard/user/post/${post.id}`}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-200"
                            >
                              Read more
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
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </Link>

                            <div className="flex space-x-2">
                              <Link
                                href={`/dashboard/user/post/edit/${post.id}`}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Other Sections */}
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-20">
            <About />
            <Team />
            <Contact />
          </div>
        </div>
      </UsersNavbar>
      <Footer />
    </>
  );
};

export default withAuth(RegularUserDashboard, ["user"]);
