"use client";
import React from "react";

interface ContactProps {
  id?: string;
}

export const Contact = ({ id }: ContactProps) => {
  return (
    <section id={id || "contact"}>
      {" "}
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* <!-- Embedded Map --> */}
        <div className="w-full h-100 rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2752.5699031495765!2d123.87970050363873!3d12.666244351339753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0d13fff8aaf73%3A0x522fbc0bf84c6fa!2sSorsogon%20State%20University%20-%20Bulan%20Campus!5e0!3m2!1sen!2sph!4v1746885430043!5m2!1sen!2sph"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* <!-- Contact Form --> */}
        <div>
          <span className="text-4xl text-gray-700 dark:text-white border-b-2 border-indigo-600 tracking-tight font-extrabold">
            Contact Us
          </span>
          <p className="mb-8 lg:mb-16 font-light text-center lg:text-left text-gray-500 dark:text-gray-400 sm:text-xl mt-4">
            Got a technical issue? Want to send feedback about our website? Need
            details about our project? Let us know.
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
