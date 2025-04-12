/* eslint-disable @next/next/no-img-element */
import React from "react";

export const About = () => {
  return (
    <section className=" dark:bg-gray-900 bg-amber-50">
      <div className="sm:flex items-center max-w-screen-xl mx-auto px-4 py-12">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="/images/undraw_my-app_15n4.png" alt="About us"
            width={500}
            height={300} />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-4xl text-gray-500 border-b-2 border-indigo-600 uppercase tracking-tight font-extrabold">
             About us
            </span>
            {/* <h2 className="mb-4 text-4xl border-indigo-600 tracking-tight font-extrabold text-gray-900 dark:text-white">About us</h2> */}
            <h2 className="my-4 font-bold text-3sm sm:text-4sm">
              Dynamic Web Application using {" "}
              <span className="text-indigo-600">
               Next.js and Tailwind CSS
              </span>
            </h2>

            <h5 className="text-gray-700 font-semibold">Objective</h5>
            <p className="text-gray-700 mb-4">
              The goal is to develop a responsive and dynamic web application that showcases 
              frontend development skills, API integration, role-based access, 
              and data visualization—all built with modern tools like Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
