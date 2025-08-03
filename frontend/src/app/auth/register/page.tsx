"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar } from "lucide-react";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authService } from "@/services";
import { ROUTES, USER_ROLES, GENDER_OPTIONS } from "@/constant";
import Link from "next/link";
import { handleApiError } from "@/utils/handleApiError";

const registerSchema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
      role: z.enum(["PATIENT", "DOCTOR", "ADMIN"]),
      phone: z.string().optional(),
      dateOfBirth: z
         .string({ required_error: "Date of Birth is Required" })
         .datetime(),
      gender: z.enum(["male", "female", "other"]),
      address: z.string().optional(),

      // Doctor-only fields (initially optional)
      experience: z
         .number({
            invalid_type_error: "Experience must be a number",
         })
         .min(0, "Experience can't be negative")
         .max(60, "Experience can't be more than 60 years")
         .optional(),

      departmentId: z.string().uuid("Invalid department ID format").optional(),
      specialization: z
         .string()
         .min(2, "Specialization is required")
         .optional(),
      qualifications: z
         .string()
         .min(2, "Qualifications are required")
         .optional(),
      licenseNumber: z.string().min(3, "License number is required").optional(),
   })
   .superRefine((data, ctx) => {
      // Password confirmation check
      if (data.password !== data.confirmPassword) {
         ctx.addIssue({
            path: ["confirmPassword"],
            message: "Passwords don't match",
            code: z.ZodIssueCode.custom,
         });
      }

      // If role is DOCTOR, validate doctor-specific fields
      if (data.role === "DOCTOR") {
         if (!data.experience && data.experience !== 0) {
            ctx.addIssue({
               path: ["experience"],
               message: "Experience is required for doctors",
               code: z.ZodIssueCode.custom,
            });
         }
         if (!data.departmentId) {
            ctx.addIssue({
               path: ["departmentId"],
               message: "Department ID is required for doctors",
               code: z.ZodIssueCode.custom,
            });
         }
         if (!data.specialization) {
            ctx.addIssue({
               path: ["specialization"],
               message: "Specialization is required for doctors",
               code: z.ZodIssueCode.custom,
            });
         }
         if (!data.qualifications) {
            ctx.addIssue({
               path: ["qualifications"],
               message: "Qualifications are required for doctors",
               code: z.ZodIssueCode.custom,
            });
         }
         if (!data.licenseNumber) {
            ctx.addIssue({
               path: ["licenseNumber"],
               message: "License number is required for doctors",
               code: z.ZodIssueCode.custom,
            });
         }
      }
   });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
      watch,
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         role: "PATIENT",
      },
   });

   const selectedRole = watch("role");

   const onSubmit = async (data: RegisterFormData) => {
      setIsLoading(true);
      try {
         const { data: response } = await authService.register(
            data,
            data.role.toLowerCase()
         );

         if (response.success) {
            toast.success(response.message || "Registration successful");
            // router.push(ROUTES.DASHBOARD);
         }
      } catch (error) {
         handleApiError(error, setError);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
         {" "}
         <div className="w-full max-w-md">
            <Card className="w-full max-w-md mx-auto">
               <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                     Create Account
                  </CardTitle>
                  <CardDescription>
                     Sign up for a new account to get started
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     className="space-y-4"
                  >
                     {/* Name */}
                     <div>
                        <label
                           htmlFor="name"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Name
                        </label>
                        <div className="relative">
                           <User className="absolute left-3 top-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                           <Input
                              id="name"
                              type="text"
                              placeholder="Enter your name"
                              className="pl-10"
                              {...register("name")}
                              error={errors.name?.message}
                           />
                        </div>
                     </div>

                     {/* Email */}
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Email Address
                        </label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                           <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              {...register("email")}
                              error={errors.email?.message}
                           />
                        </div>
                     </div>

                     {/* Role */}
                     <div>
                        <label
                           htmlFor="role"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Role
                        </label>
                        <select
                           id="role"
                           {...register("role")}
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                           {Object.entries(USER_ROLES).map(([key, value]) => (
                              <option
                                 key={key}
                                 value={key}
                              >
                                 {value}
                              </option>
                           ))}
                        </select>
                     </div>

                     {/* Role Based Filed */}
                     {selectedRole && selectedRole === "DOCTOR" ? (
                        <div>
                           <div>
                              <label
                                 htmlFor="experience"
                                 className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                 Experience
                              </label>
                              <div className="relative">
                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                 <Input
                                    id="experience"
                                    type="experience"
                                    placeholder="Enter your experience"
                                    className="pl-10"
                                    {...register("experience")}
                                    error={errors.experience?.message}
                                 />
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div></div>
                     )}

                     {/* Phone & DateOfBirth */}
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700 mb-1"
                           >
                              Phone (Optional)
                           </label>
                           <div className="relative">
                              <Phone className="absolute left-3 top-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                 id="phone"
                                 type="tel"
                                 placeholder="Phone number"
                                 className="pl-10"
                                 {...register("phone")}
                                 error={errors.phone?.message}
                              />
                           </div>
                        </div>
                        <div>
                           <label
                              htmlFor="dateOfBirth"
                              className="block text-sm font-medium text-gray-700 mb-1"
                           >
                              Date of Birth
                           </label>
                           <div className="relative">
                              <Calendar className="absolute left-3 top-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                 id="dateOfBirth"
                                 type="date"
                                 className="pl-10"
                                 {...register("dateOfBirth", {
                                    setValueAs: (value) =>
                                       value
                                          ? new Date(value).toISOString()
                                          : undefined,
                                 })}
                                 error={errors.dateOfBirth?.message}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Gender */}
                     <div>
                        <label
                           htmlFor="gender"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Gender
                        </label>
                        <select
                           id="gender"
                           {...register("gender")}
                           className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.gender?.message ? "border-red-500" : ""
                           }`}
                        >
                           <option value="">Select gender</option>
                           {GENDER_OPTIONS.map((option) => (
                              <option
                                 key={option.value}
                                 value={option.value}
                              >
                                 {option.label}
                              </option>
                           ))}
                        </select>
                     </div>

                     {/* Password */}
                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Password
                        </label>
                        <div className="relative">
                           <Lock className="absolute left-3 top-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                           <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="pl-10 pr-10"
                              {...register("password")}
                              error={errors.password?.message}
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 border-none"
                           >
                              {showPassword ? (
                                 <EyeOff className="h-4 w-4" />
                              ) : (
                                 <Eye className="h-4 w-4" />
                              )}
                           </button>
                        </div>
                     </div>

                     <div>
                        <label
                           htmlFor="confirmPassword"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Confirm Password
                        </label>
                        <div className="relative">
                           <Lock className="absolute left-3 top-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                           <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10"
                              {...register("confirmPassword")}
                              error={errors.confirmPassword?.message}
                           />
                           <button
                              type="button"
                              onClick={() =>
                                 setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 border-none"
                           >
                              {showConfirmPassword ? (
                                 <EyeOff className="h-4 w-4" />
                              ) : (
                                 <Eye className="h-4 w-4" />
                              )}
                           </button>
                        </div>
                     </div>

                     <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                     >
                        {isLoading ? "Creating account..." : "Create Account"}
                     </Button>
                  </form>

                  <div className="mt-6 text-center">
                     <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                           href="/auth/login"
                           className="text-blue-600 hover:text-blue-500"
                        >
                           Sign in here
                        </Link>
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default RegisterPage;
