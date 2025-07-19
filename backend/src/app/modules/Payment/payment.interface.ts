export interface ICreatePaymentIntent {
  amount: number;
  patientId: string;
  appointmentId?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface IPaymentCreate {
  amount: number;
  currency?: string;
  appointmentId?: string;
  prescriptionId?: string;
  labTestId?: string;
  patientId: string;
  description?: string;
}

export interface IPaymentUpdate {
  status?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  stripePaymentId?: string;
  description?: string;
}

export interface IPaymentFilters {
  patientId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface IPaymentStats {
  total: number;
  totalAmount: number;
  byStatus: Record<string, number>;
  byMonth: Record<string, number>;
}

export interface IStripePaymentIntent {
  amount: number;
  currency: string;
  paymentMethodId?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface IPaymentRefund {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export interface IPaymentWebhook {
  type: string;
  data: {
    object: {
      id: string;
      amount: number;
      currency: string;
      status: string;
      metadata?: Record<string, string>;
    };
  };
}
