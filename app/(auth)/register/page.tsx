
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import LeafletMap from "../../components/LeafletMap";

const registrationSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Enter a valid phone number"),
    address: z.string().min(5, "Please select an address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  
  const onAddressSelect = (address: string) => {
    setValue("address", address);  // Update the address in the form when selected
  };

  const onSubmit = (data: FormData) => {
    localStorage.setItem("registeredUser", JSON.stringify(data));
    alert("Registration successful!");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Your Account</h2>
          <p className="mt-4 text-lg text-gray-500">Register with your details and location.</p>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <LeafletMap onAddressSelect={onAddressSelect} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              {[
                { label: "First Name", name: "firstName", type: "text", placeholder: "John" },
                { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe" },
                { label: "Email", name: "email", type: "email", placeholder: "name@company.com" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "+63 912 345 6789" },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "••••••••" },
                { label: "Address", name: "address", type: "text", placeholder: "Click marker on map..." },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                  <input
                    {...register(name as keyof FormData)}
                    type={type}
                    className={inputClass}
                    placeholder={placeholder}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof FormData]?.message?.toString()}
                    </p>
                  )}
                </div>
              ))}


              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-500 dark:text-gray-300">
                  I accept the{" "}
                  <a href="#" className="font-medium text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5"
              >
                Create an account
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
              <p className="mt-4 text-sm text-center">
                <Link href="/" className="text-blue-600 hover:underline">
                  Go Home
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass = `
  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
  dark:bg-gray-700 dark:border-gray-600 dark:text-white
`;
