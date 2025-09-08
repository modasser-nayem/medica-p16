import React from "react";
import { DialogForm } from "@/components/form/DialogForm";
import { FieldConfig } from "@/types/form";
import { IUpdateDepartment } from "@/types";
import { departmentValidation } from "@/validation/department";
import RichTextEditor from "@/components/form/fields/RichTextEditor";
import FileUploadOrUrl from "@/components/form/fields/FileUpload";
import { departmentApi } from "@/redux/api/department";

const UpdateDepartment = ({
   children,
   defaultValue,
}: {
   children: React.ReactNode;
   defaultValue: {
      name: string;
      icon: string;
      description?: string | null;
      id: string;
   };
}) => {
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

   const [update, { isLoading, isSuccess }] =
      departmentApi.useUpdateDepartmentMutation();

   const onSubmit = (value: IUpdateDepartment) => {
      update({ data: value, id: defaultValue.id });
   };

   return (
      <div>
         <DialogForm
            openButton={children}
            dialogTitle="Update Department"
            schema={schema}
            fields={fields}
            defaultValues={defaultValue}
            submitLabel="Update"
            onSubmit={onSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
         />
      </div>
   );
};

export default UpdateDepartment;
