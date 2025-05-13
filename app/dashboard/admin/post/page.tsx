"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import withAuth from "../../../hoc/withAuth";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostsList = () => {
  const [user] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, usersRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/users"),
      ]);

      const postsData: Post[] = await postsRes.json();
      const usersData: User[] = await usersRes.json();

      setUsers(usersData);

      const filteredPosts =
        user?.email === "admin@admin.com"
          ? postsData
          : postsData.filter((post) => post.userId === user?.id);

      setPosts(filteredPosts);
      setLoading(false);
    };

    if (user) fetchData();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;
  if (!user) return <p className="text-center mt-10">Please login.</p>;

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
                  <BreadcrumbPage>Posts List</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="max-w-6xl mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const postAuthor = users.find((u) => u.id === post.userId);
              return (
                <Card
                  key={post.id}
                  className="h-full flex flex-col justify-between"
                >
                  <CardHeader>
                    <CardTitle>
                      <Link
                        href={`/dashboard/admin/post/${post.id}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-white">
                      Posted by: <strong>{postAuthor?.name}</strong> (@
                      {postAuthor?.username})
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-white">{post.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(PostsList);