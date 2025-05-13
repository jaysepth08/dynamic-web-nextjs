

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import withAuth from "../../../../../hoc/withAuth";

type UserProfile = {
  id: number | string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
};

const ProfilePage = () => {
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const params = useParams();
  const id = params?.id;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) {
          setError("No user ID provided");
          return;
        }

        if (user && user.role === "admin" && String(user.id) === String(id)) {
         
          setUserProfile({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: "/default-avatar.png",
            bio: "Admin account",
          });
        } else {
       
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
          if (!response.ok) throw new Error("Failed to fetch user data");

          const data = await response.json();
          setUserProfile({
            id: data.id,
            name: data.name,
            email: data.email,
            avatar: `https://robohash.org/${data.id}?set=set5`,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">User not found</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile.avatar || "/default-avatar.png"}
              alt={userProfile.name}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-semibold">{userProfile.name}</h1>
              <p className="text-gray-600">{userProfile.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-2 text-gray-700">{userProfile.bio}</p>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link
              href={`/dashboard/admin/users/profile/edit/${userProfile.id}`} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default withAuth(ProfilePage);