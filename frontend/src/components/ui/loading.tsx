interface LoadingProps {
   size?: "sm" | "md" | "lg";
   title?: string;
   fullScreen?: boolean;
   className?: string;
}

export default function Loading({
   size = "lg",
   title = "Loading...",
   fullScreen = false,
   className,
}: LoadingProps) {
   const sizeClasses = {
      sm: "h-5 w-5",
      md: "h-8 w-8",
      lg: "h-12 w-12",
   };

   const spinnerSize =
      size === "lg"
         ? sizeClasses.lg
         : size === "sm"
         ? sizeClasses.sm
         : sizeClasses.md;

   return (
      <div
         className={`flex items-center justify-center ${
            fullScreen && "min-h-screen"
         }`}
      >
         <div className={`${className} text-center text-lg text-gray-600`}>
            <div
               className={`${spinnerSize} animate-spin rounded-full border-b-2 border-primary-600 mx-auto`}
            ></div>
            <p className="mt-4">{title}</p>
         </div>
      </div>
   );
}
