/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const About = () => {
  return (
    <><Navbar/>
    <section className="bg-white dark:bg-gray-900">
      <div className="sm:flex items-center max-w-screen-xl mx-auto px-4 py-12">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="/images/undraw_my-app_15n4.png" alt="About us" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-4xl text-gray-500 border-b-2 border-indigo-600 uppercase tracking-tight font-extrabold">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              Dynamic Web Application using{" "}
              <span className="text-indigo-600">Next.js and Tailwind CSS</span>
            </h2>

            <h5 className="text-gray-700 font-semibold">Objective</h5>
            <p className="text-gray-700 mb-4">
              The goal is to develop a responsive and dynamic web application that
              showcases frontend development skills, API integration, role-based access,
              and data visualization—all built with modern tools like Next.js and Tailwind CSS.
            </p>

            <h5 className="text-gray-700 font-semibold">Core Features</h5>
            <ul className="text-gray-700 list-disc list-inside space-y-2">
              <li>
                <strong>Frontend Framework:</strong> Developed with{" "}
                <span className="font-medium">Next.js</span> and styled using{" "}
                <span className="font-medium">Tailwind CSS</span>.
              </li>
              <li>
                <strong>UI Libraries:</strong> Enhanced with ShadCN, Hero UI, Tailwind UI, and Flowbite.
              </li>
              <li>
                <strong>User Listing:</strong> Fetch and display a list of users with profile details using JSONPlaceholder.
              </li>
              <li>
                <strong>Map Integration:</strong> Show user locations with interactive maps using Mapbox or Maplibre.
              </li>
              <li>
                <strong>Posts & Comments:</strong>
                <ul className="list-disc list-inside ml-5">
                  <li>Display posts linked to users</li>
                  <li>Include comments for each post</li>
                  <li>Access control based on user roles (admin vs. regular users)</li>
                </ul>
              </li>
              <li>
                <strong>Admin Dashboard:</strong> Admins have access to charts showing:
                <ul className="list-disc list-inside ml-5">
                  <li>Total Users</li>
                  <li>Total Posts</li>
                  <li>Total Comments</li>
                </ul>
                Built using <span className="font-medium">ApexCharts</span>.
              </li>
              <li>
                <strong>User Registration:</strong> A frontend-only form with real-time validation using{" "}
                <span className="font-medium">Zod</span>.
              </li>
              <li>
                <strong>Authentication:</strong> Implemented via the JSONPlaceholder API to simulate user login.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
      <Footer/>
    </>
  );
};

export default About;
