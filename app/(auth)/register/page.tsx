"use client";

import { useEffect } from "react";
import Link from "next/link";
import maplibregl from "maplibre-gl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from "react-icons/fi";

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
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      localStorage.setItem("registeredUser", JSON.stringify(data));
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [120.9842, 14.5995],
      zoom: 12,
    });

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        if (data?.display_name) {
          setValue("address", data.display_name);
        }
      } catch (error) {
        console.error("Failed to fetch address:", error);
      }
    });

    return () => map.remove();
  }, [setValue]);

  const renderField = (
    label: string,
    name: keyof FormData,
    type: string,
    placeholder: string,
    icon: React.ReactNode,
    readOnly?: boolean
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <Label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          readOnly={readOnly}
          className={`pl-10 w-full rounded-lg border ${
            errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } focus:border-transparent focus:ring-2 transition-all duration-200`}
        />
      </div>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500"
        >
          {errors[name]?.message}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Create Your Account
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div id="map" className="h-[600px] w-full rounded-xl shadow-lg overflow-hidden" />
            <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Click on the map to select your address
              </p>
            </div>
          </motion.div>

          <Card className="shadow-xl">
            <CardContent className="space-y-6 pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {renderField("First Name", "firstName", "text", "John", <FiUser />)}
                  {renderField("Last Name", "lastName", "text", "Doe", <FiUser />)}
                </div>
                {renderField("Email", "email", "email", "name@example.com", <FiMail />)}
                {renderField("Phone Number", "phone", "tel", "+63 912 345 6789", <FiPhone />)}
                {renderField("Password", "password", "password", "••••••••", <FiLock />)}
                {renderField("Confirm Password", "confirmPassword", "password", "••••••••", <FiLock />)}
                {renderField(
                  "Address",
                  "address",
                  "text",
                  "Click map to select address...",
                  <FiMapPin />,
                  true
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <Checkbox id="terms" required className="text-blue-600" />
                  <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                    I accept the{" "}
                    <Link href="#" className="text-blue-600 hover:text-blue-700 underline">
                      Terms and Conditions
                    </Link>
                  </Label>
                </motion.div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>

                <div className="space-y-2 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 underline">
                      Login here
                    </Link>
                  </p>
                  <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
