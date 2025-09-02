"use client";

import DynamicForm from "@/components/form/DynamicForm";
import { FieldConfig } from "@/types/form";
import { IPatientProfile, IUpdatePatientProfile } from "@/types";
import { BLOOD_GROUP_OPTIONS } from "@/constant";
import { userValidation } from "@/validation/user";
import { userApi } from "@/redux/api/user";

const fieldProps = {
   className:
      "border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-none focus:ring-1 rounded-md",
};

const fields: FieldConfig[] = [
   {
      name: "bloodGroup",
      type: "select",
      label: "Blood Group",
      placeholder: "Select Blood Group",
      options: [
         { label: "Select", value: "" },
         ...BLOOD_GROUP_OPTIONS.map((opt) => opt),
      ],
      props: fieldProps,
   },
   {
      name: "emergencyContact",
      type: "text",
      label: "Emergency Contact",
      placeholder: "+8801816358362",
      props: fieldProps,
   },
   {
      name: "medicalHistory",
      type: "text",
      label: "Medical History",
      placeholder: "+8801815438762",
      props: fieldProps,
   },
   {
      name: "allergies",
      type: "text",
      label: "Allergies",
      placeholder: "Provide allergies",
      props: fieldProps,
   },
];

export default function PatientPersonalInformation({
   profile,
}: {
   profile: IPatientProfile;
}) {
   const updateSchema = userValidation.updatePatientProfile;
   const [updatePatientProfile, { isLoading }] =
      userApi.useUpdatePatientProfileMutation();

   const defaultValues = {
      bloodGroup: profile.bloodGroup || undefined,
      emergencyContact: profile.emergencyContact || undefined,
      medicalHistory: profile.medicalHistory || undefined,
      allergies: profile.allergies || undefined,
   };

   const onSubmit = (value: IUpdatePatientProfile) => {
      updatePatientProfile(value);
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
