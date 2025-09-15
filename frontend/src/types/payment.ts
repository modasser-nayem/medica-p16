import { IPaginationQuery } from ".";

export type IPaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface IPayment {
   id: string;
   appointmentId: string;
   amount: number;
   currency: string;
   externalId: string;
   paymentIntentId: string;
   method: string;
   status: IPaymentStatus;
   createdAt: string;
   updatedAt: string;
}

export interface IGetPaymentFilters extends IPaginationQuery {
   status?: string;
   startDate?: string;
   endDate?: string;
}
