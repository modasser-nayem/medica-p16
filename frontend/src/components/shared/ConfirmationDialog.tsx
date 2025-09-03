import { Button } from "../ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

export default function ConfirmationDialog({
   openConfirmDialog,
   setOpenConfirmDialog,
   dialogTitle = "Confirm",
   children,
   onConfirmed,
}: {
   openConfirmDialog: boolean;
   setOpenConfirmDialog: (value: boolean) => void;
   dialogTitle?: string;
   children: React.ReactNode;
   onConfirmed: () => void;
}) {
   return (
      <Dialog
         open={openConfirmDialog}
         onOpenChange={setOpenConfirmDialog}
      >
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm font-semibold text-gray-600">
               Please review the details before confirmed.
            </DialogDescription>
            <div>{children}</div>
            <DialogFooter className="flex gap-2 justify-end">
               <Button
                  variant="outline"
                  onClick={() => setOpenConfirmDialog(false)}
               >
                  Cancel
               </Button>
               <Button
                  onClick={() => {
                     onConfirmed();
                     setOpenConfirmDialog(false);
                  }}
               >
                  Confirm
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
