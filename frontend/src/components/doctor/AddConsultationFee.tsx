import React from "react";
import { DialogForm } from "@/components/form/DialogForm";
import { doctorApi } from "@/redux/api/doctor";
import { IConsultationFee, ICreateOrUpdateFees } from "@/types/doctor";
import { FieldConfig } from "@/types/form";
import { doctorValidation } from "@/validation/doctor";

const AddOrUpdateConsultationFee = ({
   children,
   defaultValue,
   dialogTitle,
   submitLevel,
}: {
   children: React.ReactNode;
   defaultValue?: IConsultationFee;
   dialogTitle: string;
   submitLevel: string;
}) => {
   const schema = doctorValidation.createOrUpdateFees;
   const fields: FieldConfig[] = [
      {
         name: "type",
         type: "select",
         label: "Consultation Type",
         required: true,
         options: [
            { label: "Select", value: "" },
            { label: "Chat", value: "CHAT" },
            { label: "Audio", value: "VOICE" },
            { label: "Video", value: "VIDEO" },
         ],
      },
      {
         name: "fee",
         type: "number",
         label: "Fee",
         required: true,
         placeholder: "e.g 100",
      },
      {
         name: "currency",
         type: "select",
         label: "Currency",
         required: true,
         options: [
            { label: "Select", value: "" },
            { label: "BDT", value: "BDT" },
            { label: "USD", value: "USD" },
         ],
      },
   ];

   const [createOrUpdate, { isLoading, isSuccess }] =
      doctorApi.useCreateOrUpdateFeesMutation();

   const onSubmit = (value: ICreateOrUpdateFees) => {
      createOrUpdate(value);
   };

   return (
      <div>
         <DialogForm
            openButton={children}
            dialogTitle={dialogTitle}
            schema={schema}
            fields={fields}
            defaultValues={defaultValue}
            submitLabel={submitLevel}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
         />
      </div>
   );
};

export default AddOrUpdateConsultationFee;
