import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import jwtHelper from "../utils/jwt";

export const authorize = (...roles: string[]) => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.cookies.accessToken;
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
