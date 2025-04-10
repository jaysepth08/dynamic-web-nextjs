
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import maplibregl from "maplibre-gl";

const registrationSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Enter a valid phone number"),
    address: z.string().min(5, "Please select an address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
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

    const onSubmit = (data: FormData) => {
        localStorage.setItem("registeredUser", JSON.stringify(data));
        alert("Registration successful!");
    };

    useEffect(() => {
        const map = new maplibregl.Map({
            container: "map",
            style: "https://demotiles.maplibre.org/style.json",
            center: [120.9842, 14.5995],
            zoom: 12,
        });

        const marker = new maplibregl.Marker({ draggable: true })
            .setLngLat([120.9842, 14.5995])
            .addTo(map);

        marker.on("dragend", async () => {
            const lngLat = marker.getLngLat();
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lngLat.lat}&lon=${lngLat.lng}`
            );
            const data = await res.json();
            if (data?.display_name) {
                setValue("address", data.display_name);
            }
        });

        return () => map.remove();
    }, [setValue]);

    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Your Account</h2>
                    <p className="mt-4 text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className="mt-16 lg:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Map Section */}
                        <div className="rounded-lg overflow-hidden">
                            <div
                                id="map"
                                className="h-80 w-full rounded-md border border-gray-300 shadow"
                            />
                        </div>

                        {/* Form Section */}
                        <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input {...register("firstName")} className={inputClass} placeholder="John" />
                                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input {...register("lastName")} className={inputClass} placeholder="Doe" />
                                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input {...register("email")} type="email" className={inputClass} placeholder="name@company.com" />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input {...register("phone")} type="tel" className={inputClass} placeholder="+63 912 345 6789" />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input {...register("password")} type="password" className={inputClass} placeholder="••••••••" />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input {...register("confirmPassword")} type="password" className={inputClass} placeholder="••••••••" />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input {...register("address")} type="text" className={inputClass} placeholder="Click marker on map..." />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            required
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300
                    dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the{" "}
                                            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                                                Terms and Conditions
                                            </a>z
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4
              focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create an account
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Login here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

const inputClass = `
  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
`;



