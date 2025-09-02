import React from "react";
import { DialogForm } from "@/components/form/DialogForm";
import { ISchedule, IUpdateSchedule } from "@/types/doctor";
import { FieldConfig } from "@/types/form";
import { scheduleValidation } from "@/validation/schedule";
import { scheduleApi } from "@/redux/api/schedule";

const UpdateSchedule = ({
   data,
   children,
}: {
   data: ISchedule;
   children?: React.ReactNode;
}) => {
   const schema = scheduleValidation.updateSchedule;
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
         name: "isActive",
         type: "checkbox",
         label: "Schedule Activation",
      },
      {
         name: "slotDurationMinutes",
         type: "number",
         label: "Slot Duration",
         placeholder: "e.g 30 (01-60)",
      },
   ];

   const [updateSchedule, { isLoading, isSuccess }] =
      scheduleApi.useUpdateScheduleMutation();

   const onSubmit = (value: IUpdateSchedule) => {
      value.dayOfWeek = Number(value.dayOfWeek);
      updateSchedule(value);
   };

   return (
      <div>
         <DialogForm
            openButton={children}
            openTitle="Update Schedule"
            dialogTitle="Update Schedule"
            defaultValues={{
               dayOfWeek: data.dayOfWeek.toString(),
               startTime: data.startTime,
               endTime: data.endTime,
               isActive: data.isActive,
               slotDurationMinutes: data.slotDurationMinutes,
            }}
            schema={schema}
            fields={fields}
            submitLabel="Update"
            onSubmit={onSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
         />
      </div>
   );
};

export default UpdateSchedule;
