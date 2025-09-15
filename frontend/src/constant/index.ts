import { UserRole } from "@/types";

export const APP_NAME = "Medica HMS";
export const APP_DESCRIPTION = "Hospital Management System";

export const PROFILE_IMAGE = (no = 1, gender?: "men" | "women") =>
   `https://randomuser.me/api/portraits/${gender ? gender : "men"}/${no}.jpg`;

export const RANDOM_IMAGE =
   "https://www.bing.com/th/id/OIP.2PNeqoXRvTli6WRVXkxZKwHaE8?w=285&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2";

export const DOCTOR_PROFILE_IMG = "/doctor_profile.svg";

export const USER_ROLES = {
   PATIENT: "PATIENT",
   DOCTOR: "DOCTOR",
   ADMIN: "ADMIN",
} as const;

export const GENDER_OPTIONS = [
   { value: "MALE", label: "Male" },
   { value: "FEMALE", label: "Female" },
   { value: "OTHER", label: "Other" },
] as const;

export const BLOOD_GROUP_OPTIONS = [
   { value: "A+", label: "A+" },
   { value: "A-", label: "A-" },
   { value: "B+", label: "B+" },
   { value: "B-", label: "B-" },
   { value: "AB+", label: "AB+" },
   { value: "AB-", label: "AB-" },
   { value: "O+", label: "O+" },
   { value: "O-", label: "O-" },
];

export const APPOINTMENT_STATUS = {
   PENDING: "PENDING",
   CONFIRMED: "CONFIRMED",
   CANCELLED: "CANCELLED",
   COMPLETED: "COMPLETED",
} as const;

export const CONSULTATION_TYPE = {
   CHAT: "CHAT",
   VIDEO: "VIDEO",
   VOICE: "VOICE",
} as const;

export const CONSULTATION_STATUS = {
   SCHEDULED: "SCHEDULED",
   IN_PROGRESS: "IN_PROGRESS",
   COMPLETED: "COMPLETED",
   CANCELLED: "CANCELLED",
} as const;

export const MESSAGE_TYPE = {
   TEXT: "TEXT",
   IMAGE: "IMAGE",
   FILE: "FILE",
   AUDIO: "AUDIO",
   VIDEO: "VIDEO",
} as const;

export const CALL_STATUS = {
   INITIATED: "INITIATED",
   RINGING: "RINGING",
   ANSWERED: "ANSWERED",
   REJECTED: "REJECTED",
   ENDED: "ENDED",
   MISSED: "MISSED",
} as const;

export const CALL_TYPE = {
   VOICE: "VOICE",
   VIDEO: "VIDEO",
} as const;

export const PAYMENT_STATUS = {
   PENDING: "PENDING",
   COMPLETED: "COMPLETED",
   FAILED: "FAILED",
   REFUNDED: "REFUNDED",
} as const;

export const NOTIFICATION_TYPE = {
   APPOINTMENT: "APPOINTMENT",
   PRESCRIPTION: "PRESCRIPTION",
   PAYMENT: "PAYMENT",
   SYSTEM: "SYSTEM",
} as const;

// export const NOTIFICATION_TYPE = {
//    INFO: "INFO",
//    SUCCESS: "SUCCESS",
//    WARNING: "WARNING",
//    ERROR: "ERROR",
//    REMINDER: "REMINDER",
// } as const;

export const DAYS_OF_WEEK = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
] as const;

export const TIME_SLOTS = [
   "09:00",
   "09:30",
   "10:00",
   "10:30",
   "11:00",
   "11:30",
   "12:00",
   "12:30",
   "14:00",
   "14:30",
   "15:00",
   "15:30",
   "16:00",
   "16:30",
   "17:00",
   "17:30",
] as const;

export const STATUS_COLORS = {
   SUCCESS: "bg-success-100 text-success-800",
   WARNING: "bg-warning-100 text-warning-800",
   ERROR: "bg-error-100 text-error-800",
   OTHER: "bg-gray-100 text-gray-800",
} as const;

export const ROUTES = {
   HOME: "/",
   LOGIN: "/login",
   REGISTER: "/register",
   UNAUTHORIZE: "/unauthorize",
   ABOUT: "/about",
   CONTACT: "/contact",
   SERVICE: "/service",
   SUPPORT: "/support",
   DOCTORS: "/doctors",
   BOOK_APPOINTMENTS: "/appointments",
   DASHBOARD: (role?: UserRole) =>
      role ? `/dashboard/${String(role).toLowerCase()}` : "/dashboard",
   PROFILE: "/dashboard/profile",
} as const;

export const API_METHODS = {
   GET: "GET",
   POST: "POST",
   PUT: "PUT",
   PATCH: "PATCH",
   DELETE: "DELETE",
} as const;

export const API_ENDPOINTS = {
   AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
      REFRESH: "/auth/refresh",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
      AUTH_USER: "/auth/me",
   },
   USER: {
      PROFILE: "/users/profile",
      UPDATE_USER_PROFILE: "/users/user-profile",
      UPDATE_PATIENT_PROFILE: "/users/patient-profile",
      UPDATE_DOCTOR_PROFILE: "/users/doctor-profile",
      CHANGE_PASSWORD: "/auth/change-password",
      GET_LIST: "/users",
      UPDATE_STATUS: (userId: string) => `/users/status/${userId}`,
      DELETE: (userId: string) => `/users/${userId}`,
   },
   DEPARTMENT: {
      CREATE: "/departments",
      GET_LIST: "/departments",
      DETAILS: (id: string) => `/departments/${id}`,
      UPDATE: (id: string) => `/departments/${id}`,
      DELETE: (id: string) => `/departments/${id}`,
   },
   DOCTOR: {
      GET_LIST: "/doctors",
      DETAILS: (id: string) => `/doctors/${id}`,
      SLOTS: (id: string) => `/doctors/${id}/slots`,
      CREATE_FEES: "/doctors/fees",
      GET_FEES: (doctorId: string) => `/doctors/${doctorId}/fees`,
      UPDATE_FEES: (feeId: string) => `/doctors/fees/${feeId}`,
   },
   SCHEDULE: {
      CREATE_SCHEDULE: "/schedules",
      GET_SCHEDULES: "/schedules",
      UPDATE_SCHEDULE: `/schedules`,
      DELETE_SCHEDULE: (id: string) => `/schedules/${id}`,
      CREATE_EXCEPTION: "/schedules/exception",
      GET_EXCEPTIONS: "/schedules/exception",
      DELETE_EXCEPTION: (id: string) => `/schedules/exception/:${id}`,
   },
   APPOINTMENT: {
      CREATE: "/appointments",
      GET_LIST: "/appointments",
      DETAILS: (id: string) => `/appointments/${id}`,
      RESCHEDULE: (id: string) => `/appointments/${id}/reschedule`,
      CANCEL: (id: string) => `/appointments/${id}/cancel`,
      DELETE: (id: string) => `/appointments/${id}`,
   },
   PAYMENT: {
      SUCCESS_HANDLER: (sessionId: string) => `/payments/success/${sessionId}`,
      RETRY_PAYMENT_PROCESS: "/payments/retry",
      REPAYMENT: "/payments/repayment",
      GET_PAYMENTS: "/payments",
   },
   DASHBOARD: {
      ADMIN_STATS: "/dashboard/admin-stats",
      DOCTOR_STATS: "/dashboard/doctor-stats",
      PATIENT_STATS: "/dashboard/patient-stats",
      PUBLIC_STATS: "/dashboard/public-stats",
      USER_ACTIVITY: "/dashboard/users-activities",
   },
} as const;

// =================================
//            NON_REQUIRED
// =================================
export const PAYMENT_METHOD = {
   CARD: "CARD",
   BANK_TRANSFER: "BANK_TRANSFER",
   CASH: "CASH",
   INSURANCE: "INSURANCE",
} as const;
