import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { IPayment, IPaymentStatus } from "@/types";
import { format } from "date-fns";
import PaymentTableAction from "./PaymentTableAction";

export default function PaymentTable({ payments }: { payments: IPayment[] }) {
   return (
      <Table>
         <TableCaption>A list of Payments</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className="font-bold text-center">
                  Appointment #
               </TableHead>
               <TableHead className="font-bold text-center">Amount</TableHead>
               <TableHead className="font-bold text-center">Method</TableHead>
               <TableHead className="font-bold text-center">Status</TableHead>
               <TableHead className="font-bold text-center">Created</TableHead>
               <TableHead className="font-bold text-center">Updated</TableHead>
               <TableHead className="font-bold text-center">Action</TableHead>
            </TableRow>
         </TableHeader>

         <TableBody>
            {payments.map((pay) => (
               <TableRow
                  key={pay.id}
                  className="hover:bg-muted/50 transition-colors space-y-2"
               >
                  <TableCell className="text-center font-medium">
                     <span>#</span> {pay.appointmentId.slice(0, 8)}
                  </TableCell>
                  <TableCell className="text-center">
                     <span>{pay.amount}</span>
                     <sup className="font-semibold">{pay.currency}</sup>
                  </TableCell>
                  <TableCell className="text-center">{pay.method}</TableCell>
                  <TableCell className="text-center">
                     <StatusBadge status={pay.status} />
                  </TableCell>
                  <TableCell className="text-center">
                     {format(new Date(pay.createdAt), "P, p")}
                  </TableCell>
                  <TableCell className="text-center">
                     {format(new Date(pay.updatedAt), "P, p")}
                  </TableCell>
                  <TableCell className="text-center space-x-2 flex items-center">
                     <PaymentTableAction data={pay} />
                  </TableCell>
               </TableRow>
            ))}
            <TableRow />
         </TableBody>
      </Table>
   );
}

/* --- Small badge component for status --- */
function StatusBadge({ status }: { status: IPaymentStatus }) {
   const colorMap: Record<IPaymentStatus, string> = {
      PENDING: "bg-warning-100 text-warning-800",
      COMPLETED: "bg-success-100 text-success-800",
      FAILED: "bg-error-100 text-error-800",
      REFUNDED: "bg-blue-100 text-blue-800",
   };

   return (
      <Badge className={`hover:bg-inherit ${colorMap[status]}`}>{status}</Badge>
   );
}
