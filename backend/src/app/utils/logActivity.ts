import prisma from "../db/connector";

type Activity = {
  userId: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
};

export const logUserActivity = async (data: Activity) => {
  await prisma.auditLog.create({
    data,
  });
};
