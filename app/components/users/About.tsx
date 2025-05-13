
import React from "react";
import Image from "next/image";

interface AboutProps {
  id?: string; 
}

export const About = ({ id }: AboutProps) => {
  return (
    <section id={id || "about"}>
      {" "}
      <div className="sm:flex items-center max-w-screen-xl mx-auto px-4 py-12">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <Image
              src="/images/about-us-illustration.png"
              alt="About us"
              className="w-full h-auto"
              width={500} 
              height={300}
            />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-4xl text-gray-700 dark:text-white border-b-2 border-indigo-600 tracking-tight font-extrabold">
              About us
            </span>
            <h2 className="my-4 font-bold text-3sm sm:text-4sm text-gray-700 dark:text-white">
              Dynamic Web Application using{" "}
              <span className="text-indigo-600">Next.js and Tailwind CSS</span>
            </h2>

            <h5 className="text-gray-700 dark:text-white font-semibold">
              Objective
            </h5>
            <p className="text-gray-700 dark:text-white mb-4">
              This is a dynamic web application project built with Next.js and
              Tailwind CSS that focuses on creating a feature-rich, responsive
              user platform. The core components include: The main technical
              stack combines Next.js for the framework, Tailwind CSS for
              styling, and various UI libraries (like ShadCN and React
              Tailwind). The application also includes a user authentication
              system using Zod and a validated user registration system using
              Zod. The application also integrates with the JSON Placeholder API
              using multiple data fetching methods including TanStack Query and
              Axios.
            </p>

            <h5 className="text-gray-700 dark:text-white font-semibold">
              Features
            </h5>
            <ul className="list-disc ml-8 text-gray-700">
              <li className="text-gray-700 dark:text-white font-semibold">
                Responsive design
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                Dynamic data fetching
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                User authentication and A validated user registration system
                using Zod
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                API integration
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                Custom components
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                A user management system with profile displays and location
                mapping
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                Data visualization using ApexCharts for administrative analytics
              </li>
              <li className="text-gray-700 dark:text-white font-semibold">
                Authentication functionality through JSON Placeholder API
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
