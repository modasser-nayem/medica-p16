"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export interface DatePickerProps {
   value?: string; // ✅ store as string (yyyy-MM-dd)
   onChange?: (date: string | undefined) => void;
   placeholder?: string;
   className?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
   ({ value, onChange, placeholder = "Pick a date", className }, ref) => {
      const [open, setOpen] = React.useState(false);

      // Convert string -> Date for Calendar
      const selectedDate = value ? parseISO(value) : undefined;

      return (
         <Popover
            open={open}
            onOpenChange={setOpen}
         >
            <PopoverTrigger asChild>
               <Button
                  ref={ref}
                  variant="outline"
                  className={cn(
                     className,
                     !value && "text-muted-foreground",
                     "input bg-primary-50"
                  )}
               >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                     format(selectedDate, "PPP")
                  ) : (
                     <span>{placeholder}</span>
                  )}
               </Button>
            </PopoverTrigger>
            <PopoverContent
               className="w-auto p-0"
               align="start"
            >
               <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                     onChange?.(date ? format(date, "yyyy-MM-dd") : undefined); // ✅ always string
                     setOpen(false);
                  }}
                  className="bg-primary-600 text-primary-foreground rounded-md border shadow-sm"
                  captionLayout="dropdown"
               />
            </PopoverContent>
         </Popover>
      );
   }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
