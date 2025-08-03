import { Router } from "express";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import { departmentRoutes } from "../modules/Department/department.routes";
import { doctorRoutes } from "../modules/Doctor/doctor.routes";
import { appointmentRoutes } from "../modules/Appointment/appointment.routes";
import { consultationRoutes } from "../modules/Consultation/consultation.routes";
import { analyticsRouters } from "../modules/Analytics/analytics.routes";

const routers = Router();
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: analyticsRouters,
  },
  {
    path: "/departments",
    route: departmentRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
  {
    path: "/",
    route: appointmentRoutes,
  },
  {
    path: "/consultations",
    route: consultationRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
