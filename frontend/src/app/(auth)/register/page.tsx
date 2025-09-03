"use client";

import DynamicForm from "@/components/form/DynamicForm";
import { FieldConfig } from "@/types/form";
import { authValidation } from "@/validation/auth";
import Image from "next/image";
import Link from "next/link";
import { IRegisterUser } from "@/types";
import { authApi } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant";

const registerSchema = authValidation.registerUser;
const fields: FieldConfig[] = [
   {
      name: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Jane Doe",
      className: "md:col-span-2",
   },
   {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "jane@company.com",
   },
   {
      name: "role",
      type: "select",
      label: "Role",
      required: true,
      placeholder: "Hey, Nayem",
      options: [
         { label: "Select", value: "" },
         { label: "Patient", value: "PATIENT" },
         { label: "Doctor", value: "DOCTOR" },
         { label: "Admin", value: "ADMIN" },
      ],
   },
   {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      placeholder: "*****",
   },
   {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      required: true,
      placeholder: "*****",
   },
   {
      name: "accepted",
      type: "checkbox",
      label: "I agree to terms",
      required: true,
   },
];

export default function Page() {
   const [register, { isLoading, isSuccess }] = authApi.useRegisterMutation();
   const router = useRouter();

   const onSubmit = (value: IRegisterUser) => {
      register(value);
   };

   if (isSuccess) {
      router.push(ROUTES.LOGIN);
   }

   return (
      <div className="flex flex-col lg:flex-row items-center gap-16">
         <div className="hidden lg:block">
            <Image
               priority
               src="/register.svg"
               alt="signup"
               width={400}
               height={400}
            />
         </div>
         <div className="max-w-[500px] min-w-[350px] space-y-5">
            <h2 className="text-2xl text-center">Create Account</h2>
            <DynamicForm
               schema={registerSchema}
               fields={fields}
               grid="grid gird-cols-1 md:grid-cols-2 gap-4"
               buttonClass="w-full"
               submitLabel="Create"
               onSubmit={onSubmit}
               isLoading={isLoading}
            />
            <div className="text-center">
               <p className="text-sm text-gray-600 mb-3">
                  Already have an account?{" "}
                  <Link
                     href="/login"
                     className="text-link"
                  >
                     Sign in here
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
