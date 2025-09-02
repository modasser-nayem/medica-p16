import React from "react";
import { DialogForm } from "@/components/form/DialogForm";
import { ICreateSchedule } from "@/types/doctor";
import { FieldConfig } from "@/types/form";
import { scheduleValidation } from "@/validation/schedule";
import { scheduleApi } from "@/redux/api/schedule";

const CreateSchedule = ({ children }: { children?: React.ReactNode }) => {
   const schema = scheduleValidation.createSchedule;
   const fields: FieldConfig[] = [
      {
         name: "dayOfWeek",
         type: "select",
         label: "Day of Week",
         required: true,
         options: [
            { label: "Select", value: "" },
            { label: "Sunday", value: 0 },
            { label: "Monday", value: 1 },
            { label: "Tuesday", value: 2 },
            { label: "Wednesday", value: 3 },
            { label: "Thursday", value: 4 },
            { label: "Friday", value: 5 },
            { label: "Saturday", value: 6 },
         ],
      },
      {
         name: "startTime",
         type: "text",
         label: "Start Time",
         required: true,
         placeholder: "e.g 10:30 (HH:MM)",
      },
      {
         name: "endTime",
         type: "text",
         label: "End Time",
         required: true,
         placeholder: "e.g 18:30 (HH:MM)",
      },
      {
         name: "slotDurationMinutes",
         type: "number",
         label: "Slot Duration",
         required: true,
         placeholder: "e.g 30 (01-60)",
      },
   ];

   const [createSchedule, { isLoading, isSuccess }] =
      scheduleApi.useCreateScheduleMutation();

   const onSubmit = (value: ICreateSchedule) => {
      value.dayOfWeek = Number(value.dayOfWeek);
      createSchedule(value);
   };

   return (
      <div>
         <DialogForm
            openButton={children}
            openTitle="Create Schedule"
            dialogTitle="Create Schedule"
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

export default CreateSchedule;
