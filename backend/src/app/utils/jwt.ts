import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserRole } from "@prisma/client";

type TForgotPayload = {
  userId: string;
  role: UserRole;
};

export type TSignTokenPayload = {
  userId: string;
  role: UserRole;
  profileId?: string;
};

const signAccessToken = (payload: TSignTokenPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRES_IN as "5d",
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload &
    TSignTokenPayload;
};

const signRefreshToken = (payload: TSignTokenPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: "6d",
  });
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload &
    TSignTokenPayload;
};

const signForgotPassToken = (payload: TForgotPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_FORGOT_PASS_EXPIRES_IN as "5d",
  });
};

const verifyForgotPassToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload &
    TForgotPayload;
};

const jwtHelper = {
  signAccessToken,
  signForgotPassToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  verifyForgotPassToken,
};
export default jwtHelper;
