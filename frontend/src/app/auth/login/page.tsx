"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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
import { ROUTES } from "@/constant";
import Link from "next/link";
import { handleApiError } from "@/utils/handleApiError";
import { useAuth } from "@/provider/AuthProvider";

const loginSchema = z.object({
   email: z.string().email("Please enter a valid email address"),
   password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
   const { login } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
   });

   const onSubmit = async (data: LoginFormData) => {
      setIsLoading(true);
      try {
         console.log(data);
         const response = await authService.login(data);

         if (response.data.success) {
            login(response.data.data.accessToken);
            toast.success(response.data.message || "Login successful");
            router.push(ROUTES.DASHBOARD);
         } else {
            toast.error(response.data.message || "Login failed");
         }
      } catch (error) {
         handleApiError(error);
      } finally {
         setIsLoading(false);
      }
   };

   const envCredentials = process.env.NEXT_PUBLIC_CREDENTIALS;

   const credentials: { role: string; credentials: string }[] = envCredentials
      ? JSON.parse(envCredentials)
      : null;

   const handleFillCredentials = (email: string, password: string) => {
      console.log({ email, password });
      reset({ email, password });
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
         <div className="w-full max-w-md">
            <Card className="w-full max-w-md mx-auto">
               <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                     Welcome Back
                  </CardTitle>
                  <CardDescription>
                     Sign in to your account to continue
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     className="space-y-4"
                  >
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
                              className="absolute right-3 top-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:cursor-pointer border-none"
                           >
                              {showPassword ? (
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
                        {isLoading ? "Signing in..." : "Sign In"}
                     </Button>
                  </form>

                  {/* Demo Credentials */}
                  {credentials && (
                     <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-800 font-medium mb-2">
                           Demo Credentials:
                        </p>
                        <div className="text-sm text-blue-700 space-y-2">
                           {credentials.map((item, i) => {
                              const [email, password] =
                                 item.credentials.split(" / ");
                              return (
                                 <div
                                    className="flex items-center"
                                    key={i}
                                 >
                                    <p>
                                       <strong className="uppercase">
                                          {item.role}
                                       </strong>
                                       : {item.credentials}
                                    </p>
                                    <Button
                                       type="button"
                                       size="sm"
                                       className="ml-2 text-xs py-0"
                                       onClick={() =>
                                          handleFillCredentials(email, password)
                                       }
                                    >
                                       Use
                                    </Button>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  )}

                  <div className="mt-6 text-center">
                     <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                           href="/auth/register"
                           className="text-blue-600 hover:text-blue-500"
                        >
                           Sign up
                        </Link>
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default LoginPage;
