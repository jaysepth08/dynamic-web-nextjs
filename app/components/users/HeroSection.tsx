/* eslint-disable @next/next/no-img-element */
import React from "react";

export const HeroSection = () => {
  return (
    <section className="slate-950 dark:bg-gray-900 relative isolate px-6 pt-14 lg:px-8 transparent">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 mt-10">
        
        <h1 className=" relative z-20 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white tracking-tight">
          Build Smarter Web Apps with{" "}
          <span className="text-blue-600">
            {" "}
            Next.js, ShadCN Library & Tailwind CSS.
          </span>
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Explore a fully responsive web app powered by modern tools. This
          project features clean UI design, API-driven data, role-based access,
          and real-time visualizations — all built with Next.js and styled using
          ShadCN and Tailwind CSS for a seamless user experience.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray rounded-lg bg-transparent border-2 border-blue-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};
