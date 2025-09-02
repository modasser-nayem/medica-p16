export interface ICreatePaymentIntent {
  amount: number;
  currency: string;
  metadata: {
    appointmentId: string;
    patientId: string;
    doctorId: string;
  };
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

export interface IPaymentRefund {
  paymentId: string;
  amount?: number;
  reason?: string;
}
