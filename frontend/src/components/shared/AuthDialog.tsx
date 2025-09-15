"use client";

import { useRouter } from "next/navigation";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constant";

const AuthDialog = ({
   openAuthDialog,
   setOpenAuthDialog,
}: {
   openAuthDialog: boolean;
   setOpenAuthDialog: (value: boolean) => void;
}) => {
   const router = useRouter();
   return (
      <Dialog
         open={openAuthDialog}
         onOpenChange={setOpenAuthDialog}
      >
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Login Required</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm text-gray-600">
               Please register or login to your account to proceed with booking.
            </DialogDescription>
            <DialogFooter className="flex gap-2 justify-end">
               <Button
                  variant="outline"
                  onClick={() => setOpenAuthDialog(false)}
               >
                  Cancel
               </Button>

               <Button
                  onClick={() => {
                     router.replace(ROUTES.LOGIN);
                     setOpenAuthDialog(false);
                  }}
               >
                  Login
               </Button>
               <Button
                  onClick={() => {
                     router.replace(ROUTES.REGISTER);
                     setOpenAuthDialog(false);
                  }}
               >
                  Register
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default AuthDialog;
