
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

type NavbarUserProps = {
    user: {
      avatar: string | undefined; 
      id: string;
      name: string;
      email: string;
    };
    children?: ReactNode;
};
  

const UsersNavbar = ({ user, children }: NavbarUserProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu toggle */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
              
                <svg
                  className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                
                <svg
                  className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Logo and links */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                {/* <img
                  className="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                /> */}
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href="/dashboard/user"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="#team"
                    className="text-gray-700 dark:text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Team
                  </Link>
                  <Link
                    href="#about"
                    className="text-gray-700 dark:text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
             
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar ?? "/default-avatar.png"}
                    alt={user.name}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg py-2 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard/user/profile/[profileId]"
                      as={`/dashboard/user/profile/${user.id}`}
                      className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 font-medium"
                    >
                      See My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu links */}
        {menuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                href="/dashboard/user"
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/team"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Team
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main>{children}</main>
    </>
  );
};

export default UsersNavbar;
