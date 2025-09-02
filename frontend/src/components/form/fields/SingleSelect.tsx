"use client";

import { SelectOption } from "@/types/form";
import React from "react";

type Props = {
   value?: string | number;
   onChange: (val: string | number) => void;
   options: SelectOption[];
   placeholder?: string;
   className?: string;
};

const SingleSelect = React.forwardRef<HTMLSelectElement, Props>(
   ({ value, onChange, options, placeholder, className }, ref) => {
      return (
         <select
            ref={ref}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={`cursor-pointer py-3.5 ${className}` || "input"}
         >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => (
               <option
                  key={o.value}
                  value={o.value}
               >
                  {o.label}
               </option>
            ))}
         </select>
      );
   }
);

SingleSelect.displayName = "SingleSelect";

export default SingleSelect;
