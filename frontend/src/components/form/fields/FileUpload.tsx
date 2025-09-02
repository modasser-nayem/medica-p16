"use client";

import Image from "next/image";
import React, { useState } from "react";

type Props = {
   value?: File | string | null; // File object or URL string
   onChange: (val: File | string | null) => void;
   accept?: string; // e.g., "image/*,video/*"
   allowUrl?: boolean; // enable URL input
   className?: string;
};

const FileUploadOrUrl = React.forwardRef<HTMLInputElement, Props>(
   (
      { value, onChange, accept = "image/*", allowUrl = true, className },
      ref
   ) => {
      const [url, setUrl] = useState<string>(
         typeof value === "string" ? value : ""
      );
      const [error, setError] = useState("");

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0] || null;
         if (!file) return;
         if (!file.type.startsWith("image/") && accept.includes("image")) {
            setError("Only images are allowed");
            onChange(null);
            return;
         }
         if (!file.type.startsWith("video/") && accept.includes("video")) {
            setError("Only videos are allowed");
            onChange(null);
            return;
         }
         setError("");
         setUrl(""); // clear URL when file selected
         onChange(file);
      };

      const handleUrlChange = (val: string) => {
         setUrl(val);
         if (val.trim() === "") {
            onChange(null);
         } else {
            onChange(val.trim());
         }
      };

      return (
         <div className={className || "flex items-center gap-5"}>
            <div>
               <Image
                  src={
                     (url.includes("https://") && url) ||
                     "https://th.bing.com/th/id/OIP.0iqvqUM-_MntTZp4CMBaigHaEK?w=290&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  }
                  alt="Image"
                  width={140}
                  height={140}
               />
            </div>
            <div className="w-full flex flex-col space-y-4">
               {/* File input */}
               <input
                  type="file"
                  accept={accept}
                  onChange={handleFileChange}
                  className="text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-none file:border-0
            file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700
              file:cursor-pointer border border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-600"
               />
               {/* OR URL input */}
               {allowUrl && (
                  <input
                     ref={ref}
                     type="url"
                     placeholder="Or enter image URL"
                     value={url}
                     onChange={(e) => handleUrlChange(e.target.value)}
                     className="w-full border px-2 py-1.5 text-gray-800 text-xs placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-400"
                  />
               )}
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
         </div>
      );
   }
);

FileUploadOrUrl.displayName = "FileUploadOrUrl";

export default FileUploadOrUrl;
