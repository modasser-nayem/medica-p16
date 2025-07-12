import config from "../../config";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { emailHelper } from "../../utils/email";
import passwordHelper from "../../utils/hash";
import jwtHelper from "../../utils/jwt";
import {
  TAdminRegistration,
  TChangePassword,
  TDoctorRegistration,
  TForgotPassword,
  TLoginResponse,
  TPatentRegistration,
  TRefreshToken,
  TResetPassword,
  TUserLogin,
} from "./auth.interface";

// User Activity Logging
const logUserActivity = async (
  userId: string,
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any,
) => {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entity: "USER",
      details,
    },
  });
};

const registerPatient = async (data: TPatentRegistration) => {
  // Check if user already exists
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existUser) {
    throw new AppError(400, "User with this email already exists");
  }

  // Hashed Password
  data.password = await passwordHelper.hashPassword(data.password);

  const result = prisma.$transaction(async (tran) => {
    const { confirmPassword, ...userData } = data;

    const user = await tran.user.create({
      data: { ...userData, role: "PATIENT" },
    });

    await tran.patient.create({
      data: {
        userId: user.id,
        bloodGroup: userData.bloodGroup,
        emergencyContact: userData.emergencyContact,
        medicalHistory: userData.medicalHistory,
        allergies: userData.allergies,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  });

  return result;
};

const registerDoctor = async (data: TDoctorRegistration) => {
  // Check if user already exists
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existUser) {
    throw new AppError(400, "User with this email already exists");
  }

  // Check if license number already exists
  const existDoctorLicense = await prisma.doctor.findUnique({
    where: { licenseNumber: data.licenseNumber },
  });

  if (existDoctorLicense) {
    throw new AppError(400, "Doctor with this license number already exists");
  }

  // Check department exist or not
  const existDepartment = await prisma.department.findUnique({
    where: { id: data.departmentId },
  });

  if (!existDepartment) {
    throw new AppError(400, "Invalid department ID");
  }

  // Hashed Password
  data.password = await passwordHelper.hashPassword(data.password);

  const result = prisma.$transaction(async (tran) => {
    const { confirmPassword, ...userData } = data;

    const user = await tran.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        phone: userData.phone,
        address: userData.address,
        role: "DOCTOR",
      },
    });

    await tran.doctor.create({
      data: {
        userId: user.id,
        departmentId: userData.departmentId,
        specialization: userData.specialization,
        qualifications: userData.qualifications,
        experience: userData.experience,
        licenseNumber: userData.licenseNumber,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  });

  return result;
};

const registerAdmin = async (data: TAdminRegistration) => {
  // Check if user already exists
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existUser) {
    throw new AppError(400, "User with this email already exists");
  }

  // Hashed Password
  data.password = await passwordHelper.hashPassword(data.password);

  const result = prisma.$transaction(async (tran) => {
    const { confirmPassword, ...userData } = data;

    const user = await tran.user.create({
      data: { ...userData, role: "ADMIN" },
    });

    await tran.admin.create({
      data: {
        userId: user.id,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  });

  return result;
};

const loginUser = async (payload: {
  data: TUserLogin;
  userAgent: string;
  ipAddress: string;
}): Promise<TLoginResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: payload.data.email },
  });

  if (!user) {
    throw new AppError(401, "Invalid email address");
  }

  // Check if user is active
  if (!user.isActive) {
    throw new AppError(
      401,
      "Account is deactivated. Please contact administrator.",
    );
  }

  // Verify password
  const isPasswordValid = await passwordHelper.comparePassword(
    payload.data.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new AppError(401, "Incorrect password!");
  }

  // Generate tokens
  const accessToken = jwtHelper.signAccessToken({
    userId: user.id,
    role: user.role,
  });
  const refreshToken = jwtHelper.signRefreshToken({
    userId: user.id,
    role: user.role,
  });

  // Log user activity
  await logUserActivity(user.id, "LOGIN", {
    ipAddress: payload.ipAddress,
    userAgent: payload.userAgent,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      isActive: user.isActive,
    },
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (data: TRefreshToken) => {
  let decodeUser = jwtHelper.verifyRefreshToken(data.token);

  if (!decodeUser?.userId) {
    throw new AppError(400, "Expires Refresh Token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decodeUser.userId },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  // Generate token
  const accessToken = jwtHelper.signAccessToken({
    userId: user.id,
    role: user.role,
  });

  return { accessToken };
};

const forgotPassword = async (data: TForgotPassword) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    // Don't reveal if user exists or not
    return null;
  }

  const token = jwtHelper.signForgotPassToken({
    userId: user.id,
    role: user.role,
  });

  const resetLink = `${config.RESET_PASS_URL}?token=${token}`;

  const htmlTemplate = emailHelper.mailTemplate.forgotPasswordEmail(
    user.name,
    resetLink,
    config.JWT_FORGOT_PASS_EXPIRES_IN,
  );

  await emailHelper.sendEmail({
    to: user.email,
    subject: "Reset Your Medica Account Password",
    htmlTemplate: htmlTemplate,
  });

  return { resetLink };
};

const resetPassword = async (data: TResetPassword) => {
  const decode = jwtHelper.verifyForgotPassToken(data.token);

  const user = await prisma.user.findUnique({ where: { id: decode.userId } });

  if (!user) {
    throw new AppError(400, "Invalid Request!");
  }

  data.newPassword = await passwordHelper.hashPassword(data.newPassword);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: data.newPassword,
    },
  });

  // Log activity
  await logUserActivity(user.id, "PASSWORD_RESET", {});

  return null;
};

const changePassword = async (payload: {
  userId: string;
  data: TChangePassword;
}) => {
  const { userId, data } = payload;

  const existUser = await prisma.user.findUnique({ where: { id: userId } });

  if (!existUser) {
    throw new AppError(404, "User not found!");
  }

  // Check provided current password is correct
  if (
    !(await passwordHelper.comparePassword(
      data.currentPassword,
      existUser.password,
    ))
  ) {
    throw new AppError(400, "Current password is incorrect");
  }

  data.newPassword = await passwordHelper.hashPassword(data.newPassword);

  await prisma.user.update({
    where: {
      id: existUser.id,
    },
    data: {
      password: data.newPassword,
    },
  });

  // Log activity
  await logUserActivity(userId, "PASSWORD_CHANGE", {});

  return null;
};

export const authService = {
  registerPatient,
  registerDoctor,
  registerAdmin,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
