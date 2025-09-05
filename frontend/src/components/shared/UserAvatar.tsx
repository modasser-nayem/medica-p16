import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
   src?: string | null;
   alt?: string;
   className?: string;
}

const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
   ({ src, alt = "User", className }, ref) => {
      // get initials from user name
      const initials = alt
         .split(" ")
         .map((n) => n[0])
         .join("")
         .toUpperCase();

      return (
         <Avatar
            ref={ref}
            className={cn(`${!src ? "border-2" : ""}`, className)}
         >
            <AvatarImage
               src={src || ""}
               alt={alt}
            />
            <AvatarFallback>{initials}</AvatarFallback>
         </Avatar>
      );
   }
);

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;
