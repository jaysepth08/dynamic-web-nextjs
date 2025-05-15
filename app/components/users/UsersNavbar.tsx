
"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Darkmode } from "../Darkmode";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-sky-200 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
          <Link href="/" className="flex items-center">
            {/* logo here */}
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Darkmode />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <span className={`absolute w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`absolute w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition duration-300 translate-y-2 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transform transition duration-300 translate-y-4 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menus Links */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:hidden`}>
            <div className="flex flex-col mt-4 space-y-4">
              <Link
                href="/dashboard/user"
                className="px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="#team"
                className="px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="#about"
                className="px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Profile Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-3 px-4">
                  <img
                    src={user.avatar ?? "/default-avatar.png"}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Link
                    href={`/dashboard/user/profile/${user.id}`}
                    className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    See My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menus Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link
              href="/dashboard/user"
              className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <span className="border-b-2 border-indigo-600 tracking-tight font-extrabold">
                Dashboard
              </span>
            </Link>
            <Link
              href="#team"
              className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Team
            </Link>
            <Link
              href="#about"
              className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Profile & Dark Mode */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <Darkmode />
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <img
                  src={user.avatar ?? "/default-avatar.png"}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {/* Desktop Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <Link
                    href={`/dashboard/user/profile/${user.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    See My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </>
  );
};

export default UsersNavbar;
