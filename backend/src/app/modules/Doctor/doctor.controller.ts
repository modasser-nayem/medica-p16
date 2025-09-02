import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { doctorService } from "./doctor.service";

// Get Doctors
const getDoctors = asyncHandler(async (req, res) => {
  const result = await doctorService.getDoctors(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved doctors",
    data: result.data,
    pagination: result.pagination,
  });
});

// Get Doctor Details
const getDoctorDetails = asyncHandler(async (req, res) => {
  const result = await doctorService.getDoctorDetails(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved doctor details",
    data: result,
  });
});

const getDoctorSlots = asyncHandler(async (req, res) => {
  const result = await doctorService.getDoctorAvailableSlots(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Successfully Retrieved Doctor Slots",
    data: result,
  });
});

const createOrUpdateConsultationFees = asyncHandler(async (req, res) => {
  const result = await doctorService.createOrUpdateConsultationFees(
    req.user.profileId!,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully create or update consultation fees",
    data: result,
  });
});

const getConsultationFees = asyncHandler(async (req, res) => {
  const result = await doctorService.getConsultationFees(req.params.doctorId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved consultation fees",
    data: result,
  });
});

const updateFeesActivation = asyncHandler(async (req, res) => {
  const result = await doctorService.updateFeesActivation(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Consultation Fees Successfully Updated",
    data: result,
  });
});

export const doctorController = {
  getDoctors,
  getDoctorDetails,
  getDoctorSlots,
  createOrUpdateConsultationFees,
  getConsultationFees,
  updateFeesActivation,
};
