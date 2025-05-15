
"use client";

import { useState } from "react";
import Link from "next/link";
import { Darkmode } from "./Darkmode";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
            className="inline-flex items-center p-2 ml-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="relative w-6 h-5">
              <span
                className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 translate-y-2 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-current transform transition-all duration-300 translate-y-4 ${
                  isMenuOpen ? "-rotate-45 -translate-y-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg z-40`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block w-full px-4 py-2 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="block w-full px-4 py-2 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#team"
              className="block w-full px-4 py-2 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
            <Link
              href="#contact"
              className="block w-full px-4 py-2 text-gray-700 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <Link
                href="/login"
                className="block w-full px-4 py-2 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="block w-full px-4 py-2 text-center text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link
            href="/"
            className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span className="border-b-2 border-indigo-600 tracking-tight font-extrabold">
              Home
            </span>
          </Link>
          <Link
            href="#about"
            className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            About
          </Link>
          <Link
            href="#team"
            className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Team
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons & Dark Mode */}
        <div className="hidden lg:flex lg:items-center lg:space-x-3">
          <Link
            href="/login"
            className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg px-4 py-2 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg px-4 py-2 transition-colors"
          >
            Register
          </Link>
          <Darkmode />
        </div>
      </div>
    </nav>
  );
};
