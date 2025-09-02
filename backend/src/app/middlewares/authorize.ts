import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import jwtHelper from "../utils/jwt";
import { UserRole } from "@prisma/client";
import { COOKIE_NAME } from "../utils/cookie";

export const authorize = (...roles: UserRole[]) => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.cookies[COOKIE_NAME.ACCESS_TOKEN];
      if (!token) throw new AppError(401, "unauthorized access");

      const decoded = jwtHelper.verifyAccessToken(token);
      if (!decoded) throw new AppError(401, "invalid access token");

      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(
          403,
          "You don't have permission to access this data!",
        );
      }

      req.user = decoded;
      next();
    },
  );
};
