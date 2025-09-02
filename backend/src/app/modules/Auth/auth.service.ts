import config from "../../config";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { emailHelper } from "../../utils/email";
import passwordHelper from "../../utils/hash";
import jwtHelper from "../../utils/jwt";
import { logUserActivity } from "../../utils/logActivity";
import {
  TUserRegistration,
  TChangePassword,
  TForgotPassword,
  TRefreshToken,
  TResetPassword,
  TUserLogin,
  TAuthUser,
} from "./auth.interface";

const registerUser = async (data: TUserRegistration) => {
  // Check if user already exists
  const existUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existUser) {
    throw new AppError(400, "User with this email already exists");
  }

  // Hashed Password
  data.password = await passwordHelper.hashPassword(data.password);

  await prisma.$transaction(async (tran) => {
    const { confirmPassword, ...userData } = data;

    const user = await tran.user.create({
      data: userData,
    });

    if (userData.role === "PATIENT") {
      await tran.patient.create({
        data: {
          userId: user.id,
        },
      });
    }

    if (userData.role === "DOCTOR") {
      await tran.doctor.create({
        data: {
          userId: user.id,
        },
      });
    }

    return user;
  });

  return null;
};

const loginUser = async (payload: {
  data: TUserLogin;
  userAgent: string;
  ipAddress: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.data.email },
    include: {
      patientProfile: { select: { id: true } },
      doctorProfile: { select: { id: true } },
    },
  });

  if (!user) {
    throw new AppError(400, "Invalid email address");
  }

  // Check if user is active
  if (!user.isActive || user.isDeleted) {
    throw new AppError(
      400,
      "Account is deactivated. Please contact administrator.",
    );
  }

  // Verify password
  const isPasswordValid = await passwordHelper.comparePassword(
    payload.data.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new AppError(400, "Incorrect password!");
  }

  if (user.role !== "ADMIN" && !user.patientProfile && !user.doctorProfile) {
    throw new AppError(404, "Profile not found! contact in support");
  }

  // Generate tokens
  const accessToken = jwtHelper.signAccessToken({
    userId: user.id,
    role: user.role,
    profileId:
      user.role === "DOCTOR" ? user.doctorProfile?.id : user.patientProfile?.id,
  });
  const refreshToken = jwtHelper.signRefreshToken({
    userId: user.id,
    role: user.role,
    profileId:
      user.role === "DOCTOR" ? user.doctorProfile?.id : user.patientProfile?.id,
  });

  // Log user activity
  await logUserActivity({
    userId: user.id,
    action: "LOGIN_USER",
    ipAddress: payload.ipAddress,
    userAgent: payload.userAgent,
  });

  const authUser: TAuthUser = {
    id: user.id,
    name: user.name,
    role: user.role,
    profileImage: user.profileImage,
    profileId: user.patientProfile
      ? user.patientProfile.id
      : user.doctorProfile
        ? user.doctorProfile.id
        : undefined,
  };

  return {
    accessToken,
    refreshToken,
    user: authUser,
  };
};

const refreshToken = async (data: TRefreshToken) => {
  let decodeUser = jwtHelper.verifyRefreshToken(data.token);

  if (!decodeUser?.userId) {
    throw new AppError(400, "Expires Refresh Token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decodeUser.userId },
    include: {
      patientProfile: { select: { id: true } },
      doctorProfile: { select: { id: true } },
    },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  // Generate token
  const accessToken = jwtHelper.signAccessToken({
    userId: user.id,
    role: user.role,
    profileId:
      user.role === "DOCTOR" ? user.doctorProfile?.id : user.patientProfile?.id,
  });

  const authUser: TAuthUser = {
    id: user.id,
    name: user.name,
    role: user.role,
    profileImage: user.profileImage,
    profileId: user.patientProfile
      ? user.patientProfile.id
      : user.doctorProfile
        ? user.doctorProfile.id
        : undefined,
  };

  return { accessToken, user: authUser };
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
  await logUserActivity({
    userId: user.id,
    action: "RESET_PASSWORD",
  });

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
  await logUserActivity({ userId, action: "CHANGE_PASSWORD" });

  return null;
};

const getAuthUser = async (payload: { userId: string }): Promise<TAuthUser> => {
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      role: true,
      profileImage: true,
      patientProfile: { select: { id: true } },
      doctorProfile: { select: { id: true } },
    },
  });

  if (!user) throw new AppError(404, "User not found!");

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    profileImage: user.profileImage,
    profileId: user.patientProfile
      ? user.patientProfile.id
      : user.doctorProfile
        ? user.doctorProfile.id
        : undefined,
  };
};

export const authService = {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getAuthUser,
};
