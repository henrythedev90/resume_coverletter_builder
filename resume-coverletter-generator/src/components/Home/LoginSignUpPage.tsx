"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/FormField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { User } from "@/types/user";

export default function LoginSignUpPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    address: { city: "", state: "" },
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { data: session } = useSession();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const handleChange = (name: string, value: string) => {
    if (name === "city" || name === "state") {
      setFormData({
        ...formData,
        address: {
          ...formData.address!, // Use the non-null assertion operator
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleConfirmPassword = (name: string, value: string) => {
    setConfirmPassword(value);
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.email?.includes("@")) newErrors.email = "Invalid email";
    if (formData.password !== confirmPassword && !isLogin) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        let response;
        if (isLogin) {
          response = await axios.post("/api/auth/login", {
            email: formData.email,
            password: formData.password,
          });

          if (response.data.token) {
            signIn("credentials", {
              email: formData.email,
              password: formData.password,
              callbackUrl: "/dashboard",
            });
          }
        } else {
          response = await axios.post("/api/auth/register", {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
          });
          setIsLogin(true);
          alert("Sign up successful, please login");
        }
      } catch (error: any) {
        if (error.response) {
          alert(error.response.data.message || error.response.data.error);
        } else {
          alert("An unexpected error occurred.");
        }
      }
    }
  };

  useEffect(() => {
    if (session && !hasLoggedIn) {
      router.push("/dashboard");
      setHasLoggedIn(true);
    }
  }, [session, router, hasLoggedIn]);

  if (session) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <FormField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  placeholder="John"
                  type="text"
                />
                <FormField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  placeholder="Doe"
                  type="text"
                />
                <FormField
                  label="City"
                  name="city"
                  value={formData.address?.city}
                  onChange={handleChange}
                  placeholder="City"
                  type="text"
                />
                <FormField
                  label="State"
                  name="state"
                  value={formData.address?.state}
                  onChange={handleChange}
                  placeholder="State"
                  type="text"
                />
              </div>
            )}
            <FormField
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="email@example.com"
              type="text"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <FormField
              label="Password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="******"
              type="password"
            />
            {!isLogin && (
              <FormField
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="******"
                type="password"
              />
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
            <Button type="submit" variant="outline" className="w-full">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
