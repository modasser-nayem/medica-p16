"use client";

import { SelectOption } from "@/types/form";
import React, { useState, useEffect } from "react";

type Props = {
   value?: Array<string | number>;
   onChange: (vals: Array<string | number>) => void;
   options: SelectOption[];
   placeholder?: string;
   className?: string;
};

const MultiSelect = React.forwardRef<HTMLParagraphElement, Props>(
   ({ value = [], onChange, options, placeholder, className }, ref) => {
      const [selected, setSelected] = useState<Array<string | number>>(value);

      useEffect(() => {
         onChange(selected);
      }, [selected]);

      const toggleOption = (val: string | number) => {
         setSelected((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
         );
      };

      return (
         <div className={className || "flex flex-col space-y-1"}>
            {placeholder && (
               <p className="text-sm text-gray-500">{placeholder}</p>
            )}
            <div className="flex flex-wrap gap-2">
               {options ? (
                  options.map((o) => (
                     <p
                        ref={ref}
                        key={o.value}
                        onChange={() => toggleOption(o.value)}
                        className={`px-3 py-1 rounded-full border border-primary-500 text-sm hover:bg-primary-500 cursor-pointer hover:text-white ${
                           selected.includes(o.value)
                              ? "bg-primary-600 text-white"
                              : "bg-white text-gray-700"
                        }`}
                     >
                        {o.label}
                     </p>
                  ))
               ) : (
                  <p className="text-xs text-error-600">
                     Please Provide Options
                  </p>
               )}
            </div>
         </div>
      );
   }
);

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
