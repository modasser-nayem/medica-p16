import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserRole } from "@prisma/client";

type TPayload = {
  userId: string;
  role: UserRole;
};

const signAccessToken = (payload: TPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRES_IN as "5d",
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
};

const signRefreshToken = (payload: TPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: "6d",
  });
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
};

const signForgotPassToken = (payload: TPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_FORGOT_PASS_EXPIRES_IN as "5d",
  });
};

const verifyForgotPassToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
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
