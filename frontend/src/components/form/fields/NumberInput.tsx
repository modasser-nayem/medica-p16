import React from "react";
import clsx from "clsx";

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   className?: string;
}

const baseInputClasses =
   "w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
   ({ className, ...props }, ref) => {
      return (
         <input
            ref={ref}
            type="number"
            {...props}
            className={clsx(baseInputClasses, className)}
         />
      );
   }
);

NumberInput.displayName = "NumberInput";
