import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { ISchedule } from "@/types";
import { format, parse } from "date-fns";
import ScheduleAction from "./ScheduleAction";

const getDayName = (day: number) => {
   const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];
   return days[day] ?? "Unknown";
};

const formatDuration = (minutes: number) => {
   const h = Math.floor(minutes / 60);
   const m = minutes % 60;
   if (h > 0 && m > 0) return `${h}h ${m}m`;
   if (h > 0) return `${h}h`;
   return `${m}m`;
};

const formatTime = (time: string) => {
   try {
      const parsed = parse(time, "HH:mm", new Date()); // parse 24h format
      return format(parsed, "hh:mm a"); // convert to AM/PM
   } catch {
      return time; // fallback if parse fails
   }
};

export default function ScheduleTable({ data }: { data: ISchedule[] }) {
   return (
      <Table>
         <TableCaption>A list of your schedules.</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className="font-bold text-center">Day</TableHead>
               <TableHead className="font-bold text-center">Start</TableHead>
               <TableHead className="font-bold text-center">End</TableHead>
               <TableHead className="font-bold text-center">
                  Slot Duration
               </TableHead>
               <TableHead className="font-bold text-center">Status</TableHead>
               <TableHead className="font-bold text-center">Action</TableHead>
            </TableRow>
         </TableHeader>

         <TableBody>
            {data?.map((schedule) => (
               <TableRow
                  key={schedule.id}
                  className="hover:bg-muted/50 transition-colors space-y-2"
               >
                  <TableCell className="text-center font-medium">
                     {getDayName(schedule.dayOfWeek)}
                  </TableCell>
                  <TableCell className="text-center">
                     {formatTime(schedule.startTime)}
                  </TableCell>
                  <TableCell className="text-center">
                     {formatTime(schedule.endTime)}
                  </TableCell>
                  <TableCell className="text-center">
                     {formatDuration(schedule.slotDurationMinutes)}
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge
                        variant={schedule.isActive ? "default" : "secondary"}
                        className={
                           schedule.isActive
                              ? "bg-success-500 hover:bg-success-500"
                              : "bg-error-500 hover:bg-error-500"
                        }
                     >
                        {schedule.isActive ? "Active" : "Inactive"}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-center space-x-2 flex items-center">
                     <ScheduleAction data={schedule} />
                  </TableCell>
               </TableRow>
            ))}
            <TableRow />
         </TableBody>
      </Table>
   );
}
