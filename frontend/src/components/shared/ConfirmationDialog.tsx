import { Button } from "@/components/ui/button";
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
   dialogHint,
   children,
   onConfirmed,
   isLoading,
}: {
   openConfirmDialog: boolean;
   setOpenConfirmDialog: (value: boolean) => void;
   dialogTitle?: string;
   dialogHint?: string;
   children: React.ReactNode;
   onConfirmed: () => void;
   isLoading?: boolean;
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
               {dialogHint
                  ? dialogHint
                  : "Please review the details before confirmed."}
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
                  disabled={isLoading}
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
