import z from "zod";
import { IGender, IPaginationQuery } from "./index";
import { doctorValidation } from "@/validation/doctor";
import { scheduleValidation } from "@/validation/schedule";

export interface ISchedule {
   dayOfWeek: number;
   startTime: string;
   endTime: string;
   slotDurationMinutes: number;
   id: string;
   isActive: boolean;
   createdAt: Date;
   updatedAt: Date;
   doctorId: string;
}

export type ICreateSchedule = {
   dayOfWeek: number;
   startTime: string;
   endTime: string;
   slotDurationMinutes?: number;
};

export type IUpdateSchedule = {
   dayOfWeek: number;
   startTime: string;
   endTime: string;
   slotDurationMinutes?: number;
   isActive?: boolean;
};

export type ICreateScheduleException = z.infer<
   typeof scheduleValidation.createScheduleException
>;

export interface IScheduleException {
   id: string;
   doctorId: string;
   startTime: string | null;
   endTime: string | null;
   date: Date;
   closed: boolean;
   blockedSlots: string[];
   note: string | null;
   createdAt: Date;
   updatedAt: Date;
}

export interface UpdateSchedule {
   doctorId: string;
   scheduleId: string;
   data: {
      startTime?: string;
      endTime?: string;
      isAvailable?: boolean;
   };
}

export interface IScheduleSlot {
   date: string;
   slots: string[];
   duration: number;
}

export type ICreateOrUpdateFees = z.infer<
   typeof doctorValidation.createOrUpdateFees
>;

export type ConsultationType = "VIDEO" | "VOICE" | "CHAT";

export interface IConsultationFee {
   id: string;
   type: ConsultationType;
   doctorId: string;
   fee: number;
   currency: string;
   isActive: boolean;
}

export interface IGetDoctorsFilter extends IPaginationQuery {
   search?: string;
   department?: string;
   specialty?: string;
   rating?: number;
   sortBy?: "rating" | "createdAt";
}

export interface IDoctor {
   id: string;
   specialties: string;
   qualification: string;
   experience: number;
   createdAt: string;
   user: {
      id: string;
      name: string;
      profileImage: any;
   };
   department: {
      id: string;
      name: string;
   };
   totalReviews: number;
   averageRating: number;
}

export interface IDoctorDetails {
   id: string;
   name: string;
   email: string;
   phone: string | null;
   dateOfBirth: Date | null;
   gender: IGender;
   address: string | null;
   profileImage: string | null;
   specialties: string | null;
   qualification: string | null;
   experience: number | null;
   userId: string;
   fees: IConsultationFee[];
   totalReviews: number;
}
