import React from "react";
import { DialogForm } from "@/components/form/DialogForm";
import { FieldConfig } from "@/types/form";
import { ICreateDepartment } from "@/types";
import { departmentValidation } from "@/validation/department";
import RichTextEditor from "@/components/form/fields/RichTextEditor";
import FileUploadOrUrl from "@/components/form/fields/FileUpload";
import { departmentApi } from "@/redux/api/department";

const CreateDepartment = ({ children }: { children: React.ReactNode }) => {
   const schema = departmentValidation.createDepartment;
   const fields: FieldConfig[] = [
      {
         name: "name",
         type: "text",
         label: "Name",
         required: true,
         placeholder: "Enter Department Name",
      },
      {
         name: "icon",
         type: "custom",
         label: "Icon",
         component: FileUploadOrUrl,
      },
      {
         name: "description",
         type: "custom",
         label: "Description",
         placeholder: "Enter Department Name",
         component: RichTextEditor,
      },
   ];

   const [create, { isLoading, isSuccess }] =
      departmentApi.useCreateDepartmentMutation();

   const onSubmit = (value: ICreateDepartment) => {
      create(value);
   };

   return (
      <div>
         <DialogForm
            openButton={children}
            dialogTitle="Create Department"
            schema={schema}
            fields={fields}
            submitLabel="Create"
            onSubmit={onSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
         />
      </div>
   );
};

export default CreateDepartment;
