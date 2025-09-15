import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { appointmentService } from "./appointment.service";

const createAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.createAppointment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Appointment created successfully",
    data: result,
  });
});

const getAppointments = asyncHandler(async (req, res) => {
  const result = await appointmentService.getAppointments({
    userId: req.user.profileId,
    filters: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointments Successfully Retrieved",
    data: result.data,
    pagination: result.pagination,
  });
});

const getAppointmentDetails = asyncHandler(async (req, res) => {
  const result = await appointmentService.getAppointmentDetails(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment Successfully Retrieved",
    data: result,
  });
});

const rescheduleAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.rescheduleAppointment({
    ...req.body,
    appointmentId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Appointment Successfully Rescheduled",
    data: result,
  });
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.cancelAppointment({
    appointmentId: req.params.id,
    cancelReason: req.body.cancelReason,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment Successfully Canceled",
    data: result,
  });
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.deleteAppointment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Appointment Successfully Deleted",
    data: result,
  });
});

export const appointmentController = {
  createAppointment,
  getAppointments,
  getAppointmentDetails,
  rescheduleAppointment,
  cancelAppointment,
  deleteAppointment,
};
