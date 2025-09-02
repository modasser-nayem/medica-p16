"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type Props = {
   value?: string;
   onChange: (val: string) => void;
   className?: string;
};

const RichTextEditor = forwardRef<HTMLDivElement, Props>(
   ({ value, onChange, className }, ref) => {
      const innerRef = useRef<HTMLDivElement | null>(null);

      // Expose the inner div ref to the parent
      useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

      useEffect(() => {
         if (
            innerRef.current &&
            value !== undefined &&
            innerRef.current.innerHTML !== value
         ) {
            innerRef.current.innerHTML = value || "";
         }
      }, [value]);

      return (
         <div
            ref={innerRef}
            contentEditable
            onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
            className={className || "input min-h-[120px]"}
            suppressContentEditableWarning
         />
      );
   }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
