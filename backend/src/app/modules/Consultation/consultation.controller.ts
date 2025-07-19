import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { consultationService } from "./consultation.service";

const createOrUpdateConsultationFees = asyncHandler(async (req, res) => {
  const result = await consultationService.createOrUpdateConsultationFees(
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
  const result = await consultationService.getConsultationFees(
    req.params.doctorId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved consultation fees",
    data: result,
  });
});

const deleteConsultationFees = asyncHandler(async (req, res) => {
  const result = await consultationService.deleteConsultationFees(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Consultation Fees Successfully Deleted",
    data: result,
  });
});

export const consultationController = {
  createOrUpdateConsultationFees,
  getConsultationFees,
  deleteConsultationFees,
};
