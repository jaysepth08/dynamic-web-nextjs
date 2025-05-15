import React from "react";
import Image from "next/image";

interface AboutProps {
  id?: string;
}

export const About = ({ id }: AboutProps) => {
  return (
    <section id={id || "about"} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/images/about-us-illustration.png"
                alt="About us"
                width={600}
                height={400}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                <span className="inline-block border-b-4 border-indigo-600 pb-2">
                  About us
                </span>
              </h2>

              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Dynamic Web Application using{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Next.js and Tailwind CSS
                </span>
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Objective
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    This is a dynamic web application project built with Next.js and
                    Tailwind CSS that focuses on creating a feature-rich, responsive
                    user platform. The core components include: The main technical
                    stack combines Next.js for the framework, Tailwind CSS for
                    styling, and various UI libraries (like ShadCN and React
                    Tailwind).
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Key Features
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Responsive design",
                      "Dynamic data fetching",
                      "User authentication",
                      "API integration",
                      "Custom components",
                      "User management system",
                      "Data visualization",
                      "Authentication functionality"
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <svg
                          className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
