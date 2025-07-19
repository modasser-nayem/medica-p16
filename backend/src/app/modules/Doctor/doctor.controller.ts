import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { doctorService } from "./doctor.service";

const createSchedule = asyncHandler(async (req, res) => {
  const result = await doctorService.createSchedule({
    doctorId: req.params.doctorId,
    data: req.body,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Schedule created successfully",
    data: result,
  });
});

const getSchedules = asyncHandler(async (req, res) => {
  const result = await doctorService.getSchedules(req.params.doctorId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedules retrieved successfully",
    data: result,
  });
});

const updateSchedule = asyncHandler(async (req, res) => {
  const result = await doctorService.updateSchedule(
    req.params.doctorId,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule updated successfully",
    data: result,
  });
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const result = await doctorService.deleteSchedule(
    req.params.doctorId,
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const doctorController = {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
};
