import { Router } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { departmentRoutes } from "../modules/Department/department.routes";
import { doctorRoutes } from "../modules/Doctor/doctor.routes";
import { appointmentRoutes } from "../modules/Appointment/appointment.routes";
import { consultationRoutes } from "../modules/Consultation/consultation.routes";
import { analyticsRouters } from "../modules/Analytics/analytics.routes";
import { scheduleRoutes } from "../modules/Schedule/schedule.routes";
import { paymentRoutes } from "../modules/Payment/payment.routes";

const routers = Router();
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/dashboard",
    route: analyticsRouters,
  },
  {
    path: "/departments",
    route: departmentRoutes,
  },
  {
    path: "/doctors",
    route: doctorRoutes,
  },
  {
    path: "/schedules",
    route: scheduleRoutes,
  },
  {
    path: "/appointments",
    route: appointmentRoutes,
  },
  {
    path: "/payments",
    route: paymentRoutes,
  },
  {
    path: "/consultations",
    route: consultationRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
