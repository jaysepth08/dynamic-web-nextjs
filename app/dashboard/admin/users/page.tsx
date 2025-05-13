"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../lib/api";
import { User } from "../../../types/user";
import Link from "next/link";
import UserMap from "../../../components/UserMap";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import withAuth from "../../../hoc/withAuth";

const UsersList = () => {
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-blue-600 animate-pulse">
          Loading users...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-500">
          Error loading users. Please try again later.
        </p>
      </div>
    );

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
                  <BreadcrumbPage>List of Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="w-full">
          <h1 className="text-2xl font-extrabold text-blue-600 inline-block">
           List of users
          </h1>
          <p className="text-gray-600 dark:text-white mt-2">
            View user details with their contact information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {users.map((user) => (
              <Card key={user.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-600">{user.name}</CardTitle>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700 dark:text-white">
                    <strong>City:</strong> {user.address.city}
                  </p>
                  <p className="text-gray-700 dark:text-white">
                    <strong>Street:</strong> {user.address.street}
                  </p>
                  <Link
                    href={`/dashboard/admin/users/${user.id}`}
                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="bg-muted/50 min-h-[100vh] flex-1 mb-8 rounded-xl md:min-h-min w-full">
            <UserMap users={users} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(UsersList);