"use client";

import DynamicForm from "@/components/form/DynamicForm";
import { FieldConfig } from "@/types/form";
import { authValidation } from "@/validation/auth";
import Image from "next/image";
import Link from "next/link";
import { authApi } from "@/redux/api/auth";
import { ILoginUser } from "@/types";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slice/authSlice";
import { ROUTES } from "@/constant";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const loginSchema = authValidation.loginUser;

const fields: FieldConfig[] = [
   {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "jane@company.com",
   },
   {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      placeholder: "*****",
   },
];

export default function Page() {
   const [defaultUser, setDefaultUser] = useState({});
   const router = useRouter();
   const [loginUser, { data, isLoading }] = authApi.useLoginMutation();

   const onSubmit = (value: ILoginUser) => {
      loginUser(value);
   };

   useEffect(() => {
      setDefaultUser(defaultUser);
   }, [defaultUser]);

   if (data?.success) {
      setUser(data.data);
      router.push(ROUTES.DASHBOARD(data.data.role));
   }

   const envCredentials = process.env.NEXT_PUBLIC_CREDENTIALS;

   const credentials: { role: string; credentials: string }[] = envCredentials
      ? JSON.parse(envCredentials)
      : null;

   const handleLogin = (data: { email: string; password: string }) => {
      loginUser(data);
   };

   return (
      <div className="flex flex-col md:flex-row items-center gap-16">
         <div className="hidden md:block">
            <Image
               src="/login.svg"
               alt="signup"
               width={400}
               height={400}
            />
         </div>
         <div className="max-w-[500px] min-w-[350px] space-y-5">
            <div>
               <h4 className="text-center mb-2">Login As</h4>
               <div className="flex justify-center gap-5">
                  {credentials.map((user, i) => (
                     <Button
                        key={i}
                        size="sm"
                        disabled={isLoading}
                        onClick={() => {
                           const [email, password] =
                              user.credentials.split(" / ");
                           handleLogin({ email, password });
                        }}
                     >
                        {user.role.toUpperCase()}
                     </Button>
                  ))}
               </div>
            </div>
            <h2 className="text-2xl text-center">Sign In</h2>
            <DynamicForm
               schema={loginSchema}
               fields={fields}
               buttonClass="w-full mt-4"
               submitLabel="Sign In"
               onSubmit={onSubmit}
               isLoading={isLoading}
            />
            <div className="text-center">
               <p className="mb-2 -mt-2 text-sm text-link">Forgot Password</p>
               <p className="text-sm text-gray-600 mb-3">
                  Don't have an account?{" "}
                  <Link
                     href="/register"
                     className="text-link"
                  >
                     Create here
                  </Link>
               </p>
               <Link
                  href="/"
                  className="text-link"
               >
                  Go Back
               </Link>
            </div>
         </div>
      </div>
   );
}
