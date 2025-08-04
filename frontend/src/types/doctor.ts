import { ConsultationType } from "./appointment";

export interface ISchedule {
   startTime: string;
   endTime: string;
   dayOfWeek: number;
   isAvailable: boolean;
   id: string;
   doctorId: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateSchedule {
   doctorId: string;
   data: {
      dayOfWeek: number;
      startTime: string;
      endTime: string;
   };
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

export interface CreateOrUpdateConsultationFees {
   doctorId: string;
   type: ConsultationType;
   fee: number;
}

export interface ConsultationFee {
   id: string;
   type: ConsultationType;
   doctorId: string;
   fee: number;
}

export interface IDoctor {
   id: string;
   specialization: string;
   qualifications: string;
   experience: number;
   isAvailable: boolean;
   createdAt: string;
   user: {
      id: string;
      name: string;
      dateOfBirth: string;
      profileImage: any;
   };
   department: {
      id: string;
      name: string;
   };
   totalReviews: number;
   averageRating: number;
}
