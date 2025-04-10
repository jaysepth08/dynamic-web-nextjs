
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset } from "@/components/ui/sidebar"

// Types
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function PostDetail() {
  const { id } = useParams();
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const postData: Post = await postRes.json();

      // If not admin, only allow access to own posts
      if (user?.email !== "admin@admin.com" && user?.id !== postData.userId) {
        setPost(null);
        setLoading(false);
        return;
      }

      setPost(postData);

      // Fetch post author info
      const authorRes = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
      const authorData: User = await authorRes.json();
      setAuthor(authorData);

      // Fetch comments
      const commentRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      const commentData: Comment[] = await commentRes.json();
      setComments(commentData);

      setLoading(false);
    };

    if (user) fetchPostAndComments();
  }, [id, user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!post) return <p className="text-center text-red-500 mt-10">You do not have access to this post.</p>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Posts List Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="max-w-3xl mx-auto py-10 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-2">{post.title}</h1>
            {author && (
              <p className="text-sm text-gray-600 mb-2">
                Posted by <span className="font-medium">{author.name}</span> (@{author.username})
              </p>
            )}
            <p className="text-gray-800">{post.body}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">🗨️ Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-500 italic">No comments found.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="border p-4 rounded shadow-sm">
                    <p className="font-medium">{comment.name} ({comment.email})</p>
                    <p className="text-gray-700">{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
