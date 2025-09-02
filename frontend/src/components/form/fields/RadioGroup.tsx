"use client";

import React from "react";

type Option = { label: string; value: string | number };

type Props = {
   value?: string | number;
   onChange: (val: string | number) => void;
   options: Option[];
   className?: string;
};

const RadioGroup = React.forwardRef<HTMLInputElement, Props>(
   ({ value, onChange, options, className }, ref) => {
      return (
         <div className={className}>
            {options.map((o) => (
               <label
                  key={o.value}
                  className="mr-4"
               >
                  <input
                     ref={ref}
                     type="radio"
                     value={o.value}
                     checked={value === o.value}
                     onChange={() => onChange(o.value)}
                     className="mr-1"
                  />
                  {o.label}
               </label>
            ))}
         </div>
      );
   }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
