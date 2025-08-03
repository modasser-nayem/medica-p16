export const APP_NAME = "Medica HMS";
export const APP_DESCRIPTION = "Hospital Management System";

export const USER_ROLES = {
   PATIENT: "PATIENT",
   DOCTOR: "DOCTOR",
   ADMIN: "ADMIN",
} as const;

export const APPOINTMENT_STATUS = {
   SCHEDULED: "SCHEDULED",
   CONFIRMED: "CONFIRMED",
   IN_PROGRESS: "IN_PROGRESS",
   COMPLETED: "COMPLETED",
   CANCELLED: "CANCELLED",
   NO_SHOW: "NO_SHOW",
} as const;

export const APPOINTMENT_TYPE = {
   CONSULTATION: "CONSULTATION",
   FOLLOW_UP: "FOLLOW_UP",
   EMERGENCY: "EMERGENCY",
} as const;

export const CONSULTATION_TYPE = {
   VIDEO: "VIDEO",
   VOICE: "VOICE",
   CHAT: "CHAT",
   IN_PERSON: "IN_PERSON",
} as const;

export const PAYMENT_STATUS = {
   PENDING: "PENDING",
   COMPLETED: "COMPLETED",
   FAILED: "FAILED",
   REFUNDED: "REFUNDED",
} as const;

export const PAYMENT_METHOD = {
   CARD: "CARD",
   BANK_TRANSFER: "BANK_TRANSFER",
   CASH: "CASH",
   INSURANCE: "INSURANCE",
} as const;

export const LAB_REQUEST_STATUS = {
   PENDING: "PENDING",
   IN_PROGRESS: "IN_PROGRESS",
   COMPLETED: "COMPLETED",
   CANCELLED: "CANCELLED",
} as const;

export const TICKET_PRIORITY = {
   LOW: "LOW",
   MEDIUM: "MEDIUM",
   HIGH: "HIGH",
   URGENT: "URGENT",
} as const;

export const TICKET_STATUS = {
   OPEN: "OPEN",
   IN_PROGRESS: "IN_PROGRESS",
   RESOLVED: "RESOLVED",
   CLOSED: "CLOSED",
} as const;

export const TICKET_CATEGORY = {
   TECHNICAL: "TECHNICAL",
   BILLING: "BILLING",
   APPOINTMENT: "APPOINTMENT",
   GENERAL: "GENERAL",
} as const;

export const NOTIFICATION_TYPE = {
   INFO: "INFO",
   SUCCESS: "SUCCESS",
   WARNING: "WARNING",
   ERROR: "ERROR",
   REMINDER: "REMINDER",
} as const;

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

export const GENDER_OPTIONS = [
   { value: "male", label: "Male" },
   { value: "female", label: "Female" },
   { value: "other", label: "Other" },
] as const;

export const STATUS_COLORS = {
   [APPOINTMENT_STATUS.SCHEDULED]: "bg-blue-100 text-blue-800",
   [APPOINTMENT_STATUS.CONFIRMED]: "bg-green-100 text-green-800",
   [APPOINTMENT_STATUS.IN_PROGRESS]: "bg-yellow-100 text-yellow-800",
   [APPOINTMENT_STATUS.COMPLETED]: "bg-green-100 text-green-800",
   [APPOINTMENT_STATUS.CANCELLED]: "bg-red-100 text-red-800",
   [APPOINTMENT_STATUS.NO_SHOW]: "bg-gray-100 text-gray-800",
} as const;

export const PRIORITY_COLORS = {
   [TICKET_PRIORITY.LOW]: "bg-gray-100 text-gray-800",
   [TICKET_PRIORITY.MEDIUM]: "bg-blue-100 text-blue-800",
   [TICKET_PRIORITY.HIGH]: "bg-yellow-100 text-yellow-800",
   [TICKET_PRIORITY.URGENT]: "bg-red-100 text-red-800",
} as const;

export const PAYMENT_STATUS_COLORS = {
   [PAYMENT_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
   [PAYMENT_STATUS.COMPLETED]: "bg-green-100 text-green-800",
   [PAYMENT_STATUS.FAILED]: "bg-red-100 text-red-800",
   [PAYMENT_STATUS.REFUNDED]: "bg-gray-100 text-gray-800",
} as const;

export const LAB_STATUS_COLORS = {
   [LAB_REQUEST_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
   [LAB_REQUEST_STATUS.IN_PROGRESS]: "bg-blue-100 text-blue-800",
   [LAB_REQUEST_STATUS.COMPLETED]: "bg-green-100 text-green-800",
   [LAB_REQUEST_STATUS.CANCELLED]: "bg-red-100 text-red-800",
} as const;

export const ROUTES = {
   HOME: "/",
   LOGIN: "/auth/login",
   REGISTER: "/auth/register",
   DASHBOARD: "/dashboard",
   APPOINTMENTS: "/appointments",
   DOCTORS: "/doctors",
   PATIENTS: "/patients",
   LAB: "/lab",
   ADMIN: "/admin",
   PROFILE: "/profile",
   SUPPORT: "/support",
} as const;

export const API_ENDPOINTS = {
   AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
      REFRESH: "/auth/refresh",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
   },
   USERS: {
      PROFILE: "/users/profile",
      UPDATE_PROFILE: "/users/profile",
      CHANGE_PASSWORD: "/users/change-password",
   },
   APPOINTMENTS: {
      LIST: "/appointments",
      CREATE: "/appointments",
      DETAILS: (id: string) => `/appointments/${id}`,
      UPDATE: (id: string) => `/appointments/${id}`,
      CANCEL: (id: string) => `/appointments/${id}/cancel`,
   },
   DOCTORS: {
      LIST: "/doctors",
      DETAILS: (id: string) => `/doctors/${id}`,
      AVAILABILITY: (id: string) => `/doctors/${id}/availability`,
   },
   DEPARTMENTS: {
      LIST: "/departments",
   },
   LAB: {
      TESTS: "/lab/tests",
      REQUESTS: "/lab/requests",
      RESULTS: "/lab/results",
   },
   PAYMENTS: {
      LIST: "/payments",
      CREATE: "/payments",
   },
   NOTIFICATIONS: {
      LIST: "/notifications",
      MARK_READ: (id: string) => `/notifications/${id}/read`,
   },
   SUPPORT: {
      TICKETS: "/support/tickets",
      CREATE: "/support/tickets",
      DETAILS: (id: string) => `/support/tickets/${id}`,
      RESPOND: (id: string) => `/support/tickets/${id}/respond`,
   },
   DASHBOARD: {
      STATS: "/dashboard/stats",
   },
} as const;
