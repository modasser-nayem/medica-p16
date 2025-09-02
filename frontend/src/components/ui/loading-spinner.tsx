import { Loader2 } from "lucide-react";

export function LoadingSpinner({
   size = 24,
   className,
}: {
   size?: number;
   className?: string;
}) {
   return (
      <div className={`${className} inline-flex items-center justify-center`}>
         <Loader2
            className="animate-spin"
            size={size}
         />
      </div>
   );
}
