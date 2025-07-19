export type TCreateOrUpdateConsultationFees = {
  doctorId: string;
  type: "CHAT" | "VOICE" | "VIDEO";
  fee: number;
};
