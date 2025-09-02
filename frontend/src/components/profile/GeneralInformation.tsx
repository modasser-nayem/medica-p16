"use client";

import DynamicForm from "@/components/form/DynamicForm";
import { FieldConfig } from "@/types/form";
import { IRegisterUser, User } from "@/types";
import { GENDER_OPTIONS } from "@/constant";
import DatePicker from "@/components/form/fields/DatePicker";
import FileUploadOrUrl from "@/components/form/fields/FileUpload";
import { userValidation } from "@/validation/user";
import { userApi } from "@/redux/api/user";

const fieldProps = {
   className:
      "border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-none focus:ring-1 rounded-md",
};

const fields: FieldConfig[] = [
   {
      name: "profileImage",
      type: "custom",
      label: "Profile Image",
      placeholder: "image url",
      component: FileUploadOrUrl,
   },
   {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Jane Doe",
      className: "text-sm",
      props: fieldProps,
   },
   {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "jane@company.com",
      props: fieldProps,
   },
   {
      name: "phone",
      type: "text",
      label: "Phone",
      placeholder: "+8801815438762",
      props: fieldProps,
   },
   {
      name: "dateOfBirth",
      type: "custom",
      label: "Date Of Birth",
      component: DatePicker,
      props: fieldProps,
   },
   {
      name: "gender",
      type: "select",
      label: "Gender",
      placeholder: "Select Gender",
      options: [
         { label: "Select", value: "" },
         ...GENDER_OPTIONS.map((opt) => opt),
      ],
      props: fieldProps,
   },
   {
      name: "address",
      type: "text",
      label: "Address",
      placeholder: "Mirsarai, Chittagong, Bangladesh",
      props: fieldProps,
   },
];

export default function GeneralInformation({ user }: { user: User }) {
   const updateSchema = userValidation.updateUserProfile;
   const [updateUser, { isLoading }] =
      userApi.useUpdateUserInformationMutation();

   const defaultValues = {
      name: user.name,
      email: user.email,
      phone: user.phone || undefined,
      dateOfBirth: user.dateOfBirth || undefined,
      gender: user.gender || undefined,
      address: user.address || undefined,
      profileImage: user.profileImage || undefined,
   };

   const onSubmit = (value: IRegisterUser) => {
      updateUser(value);
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
