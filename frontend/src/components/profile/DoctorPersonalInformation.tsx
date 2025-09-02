"use client";

import DynamicForm from "@/components/form/DynamicForm";
import { FieldConfig } from "@/types/form";
import { IDoctorProfile, IUpdateDoctorProfile } from "@/types";
import { BLOOD_GROUP_OPTIONS } from "@/constant";
import { userValidation } from "@/validation/user";
import { userApi } from "@/redux/api/user";

const fieldProps = {
   className:
      "border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-none focus:ring-1 rounded-md",
};

export default function DoctorPersonalInformation({
   profile,
}: {
   profile: IDoctorProfile;
}) {
   const fields: FieldConfig[] = [
      {
         name: "departmentId",
         type: "select",
         label: "Department",
         options: [
            { label: "Select", value: "" },
            ...BLOOD_GROUP_OPTIONS.map((opt) => opt),
         ],
         props: fieldProps,
      },
      {
         name: "specialties",
         type: "text",
         label: "Specialties",
         placeholder: "Enter specialties",
         props: fieldProps,
      },
      {
         name: "qualification",
         type: "text",
         label: "Qualification",
         placeholder: "Enter your qualification",
         props: fieldProps,
      },
      {
         name: "experience",
         type: "number",
         label: "Years Of Experience",
         placeholder: "5",
         props: fieldProps,
      },
      {
         name: "bio",
         type: "textarea",
         label: "About",
         placeholder: "write about yourself",
         props: fieldProps,
      },
   ];

   const updateSchema = userValidation.updateDoctorProfile;
   const [updateDoctorProfile, { isLoading }] =
      userApi.useUpdateDoctorProfileMutation();

   const defaultValues: IUpdateDoctorProfile = {
      departmentId: profile.departmentId || undefined,
      specialties: profile.specialties || undefined,
      qualification: profile.qualification || undefined,
      experience: profile.experience || undefined,
      bio: profile.bio || undefined,
   };

   const onSubmit = (value: IUpdateDoctorProfile) => {
      updateDoctorProfile(value);
   };

   return (
      <div className="">
         <DynamicForm
            schema={updateSchema}
            fields={fields}
            defaultValues={defaultValues}
            submitLabel="Update"
            buttonClass="px-3 py-2 mt-4"
            onSubmit={onSubmit}
            isLoading={isLoading}
         />
      </div>
   );
}
