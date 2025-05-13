
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
    readOnly?: boolean
  ) => (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        readOnly={readOnly}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        <div id="map" className="h-[400px] w-full rounded-md border shadow" />

        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {renderField("First Name", "firstName", "text", "John")}
              {renderField("Last Name", "lastName", "text", "Doe")}
              {renderField("Email", "email", "email", "name@example.com")}
              {renderField("Phone Number", "phone", "tel", "+63 912 345 6789")}
              {renderField("Password", "password", "password", "••••••••")}
              {renderField("Confirm Password", "confirmPassword", "password", "••••••••")}
              {renderField(
                "Address (Click on map)",
                "address",
                "text",
                "Click map to select address...",
                true
              )}

              <div className="flex items-center gap-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms">
                  I accept the{" "}
                  <a href="#" className="underline text-blue-600">
                    Terms and Conditions
                  </a>
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Create an account
              </Button>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="underline text-blue-600">
                  Login here
                </Link>
              </p>

              <p className="text-sm text-center">
                <Link href="/" className="underline text-blue-600">
                  Go Home
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
