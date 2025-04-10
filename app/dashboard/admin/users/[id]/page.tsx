// app/users/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../../../lib/api";
// import { fetchUserById, fetchPostsByUser } from "../../lib/api";
import UserMap from "../../../../components/UserMap";
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
import {
  SidebarInset
} from "@/components/ui/sidebar"



export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userId = parseInt(params.id);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });

  //   const {
  //     data: posts,
  //     isLoading: postsLoading,
  //     error: postsError,
  //   } = useQuery({
  //     queryKey: ["posts", userId],
  //     queryFn: () => fetchPostsByUser(userId),
  //     enabled: !!userId,
  //   });

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-blue-600 animate-pulse">
          Loading user profile...
        </p>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-500">
          Error loading user profile
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-yellow-600">
          User not found
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="min-h-screen bg-gray-100 p-6">
        
          <div className="max-w-4xl mx-auto">
            {/* User Profile Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 mt-2">@{user.username}</p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">{user.phone}</p>
                  <p className="text-gray-600">{user.website}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Address</h2>
                  <p className="text-gray-600">
                    {user.address.street}, {user.address.suite}
                  </p>
                  <p className="text-gray-600">
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
              </div>
            </div>

            {/* User Location Map */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
              <div className="h-64 rounded-md overflow-hidden">
                <UserMap users={[user]} />
              </div>
            </div>

            {/* User Posts */}
            {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
          
          {postsLoading ? (
            <p className="text-gray-600">Loading posts...</p>
          ) : postsError ? (
            <p className="text-red-500">Error loading posts</p>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No posts found</p>
          )}
        </div> */}

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}