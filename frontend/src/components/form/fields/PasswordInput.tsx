"use client";

import React, { useState } from "react";

type Props = {
   value?: string;
   onChange: (val: string) => void;
   placeholder?: string;
   className?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
   ({ value, onChange, placeholder, className }, ref) => {
      const [visible, setVisible] = useState(false);

      return (
         <div className="relative">
            <input
               type={visible ? "text" : "password"}
               value={value || ""}
               onChange={(e) => onChange(e.target.value)}
               placeholder={placeholder}
               className={className || "w-full border rounded px-3 py-2"}
            />
            <button
               type="button"
               onClick={() => setVisible(!visible)}
               className="absolute right-2 top-2 text-gray-500"
            >
               {visible ? "Hide" : "Show"}
            </button>
         </div>
      );
   }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
