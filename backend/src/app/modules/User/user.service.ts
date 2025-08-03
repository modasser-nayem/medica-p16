import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import {
  IUserProfileWithDetails,
  TGetDoctorsFilter,
  TGetUsersFilter,
  TUpdateAdminProfile,
  TUpdateDoctorProfile,
  TUpdatePatientProfile,
} from "./user.interface";
import { paginate } from "../../utils/pagination";

// ======================================
//                User
// ======================================
// Get user profile
const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      adminProfile: true,
      doctorProfile: true,
      patientProfile: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = user;

  return result;
};

// Update Patient Profile
const updatePatientProfile = async (payload: {
  userId: string;
  data: TUpdatePatientProfile;
}): Promise<IUserProfileWithDetails> => {
  const { data } = payload;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      profileImage: data.profileImage,
      patientProfile: {
        update: {
          data: {
            bloodGroup: data.bloodGroup,
            emergencyContact: data.emergencyContact,
            medicalHistory: data.medicalHistory,
            allergies: data.allergies,
          },
        },
      },
    },
    include: {
      patientProfile: {
        select: {
          id: true,
          bloodGroup: true,
          emergencyContact: true,
          medicalHistory: true,
          allergies: true,
        },
      },
    },
  });

  return result;
};

// Update Doctor Profile
const updateDoctorProfile = async (payload: {
  userId: string;
  data: TUpdateDoctorProfile;
}): Promise<IUserProfileWithDetails> => {
  const { data } = payload;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      profileImage: data.profileImage,
      doctorProfile: {
        update: {
          data: {
            departmentId: data.departmentId,
            specialization: data.specialization,
            qualifications: data.qualifications,
            experience: data.experience,
            licenseNumber: data.licenseNumber,
            isAvailable: data.isAvailable,
          },
        },
      },
    },
    include: {
      doctorProfile: {
        select: {
          id: true,
          department: {
            select: { id: true, name: true },
          },
          specialization: true,
          qualifications: true,
          experience: true,
          licenseNumber: true,
          isAvailable: true,
        },
      },
    },
  });

  return result;
};

// Update Admin Profile
const updateAdminProfile = async (payload: {
  userId: string;
  data: TUpdateAdminProfile;
}): Promise<IUserProfileWithDetails> => {
  const { data } = payload;

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      profileImage: data.profileImage,
    },
    include: {
      adminProfile: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  return result;
};

// ======================================
//                Patient
// ======================================

// Get Doctors
const getDoctors = async (filters: TGetDoctorsFilter) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const rating = Number(filters.rating);
  const skip = (page - 1) * limit;
  const { search, specialty, available, sortBy, sortOrder } = filters;

  const where: Prisma.DoctorWhereInput = {
    user: { isActive: true },
  };

  if (available) {
    if (available === "yes" || available === "no") {
      where.isAvailable = available === "yes" ? true : false;
    }
  }

  if (specialty) {
    where.specialization = specialty;
  }

  if (search) {
    where.user = { name: { contains: search, mode: "insensitive" } };
  }

  if (rating) {
    where.reviews = { some: { rating: { gte: rating } } };
  }

  // Fetch doctors
  const doctors = await prisma.doctor.findMany({
    where,
    select: {
      id: true,
      specialization: true,
      qualifications: true,
      experience: true,
      isAvailable: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          dateOfBirth: true,
          profileImage: true,
        },
      },
      department: { select: { id: true, name: true } },
      reviews: {
        select: {
          rating: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
    skip,
    take: limit,
  });

  // Calculate Average Rating for each doctor
  const enrichedDoctors = doctors.map((doctor) => {
    const totalReviews = doctor._count.reviews || 0;

    const totalRating = doctor.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    const { reviews, _count, ...rest } = doctor;

    return {
      ...rest,
      totalReviews,
      averageRating: Number(averageRating.toFixed(2)),
    };
  });

  // Sorting based on user provided sort
  const sortedDoctors = enrichedDoctors.sort((a, b) => {
    if (filters.sortBy === "rating") {
      return filters.sortOrder === "asc"
        ? a.averageRating - b.averageRating
        : b.averageRating - a.averageRating;
    }

    if (filters.sortBy === "createdAt") {
      return filters.sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return 0;
  });

  const total = sortedDoctors.length;
  const paginatedDoctors = sortedDoctors.slice(0, limit); // already skipped during query

  return {
    data: paginatedDoctors,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// TODO: Get Doctor Details
const getDoctorDetails = async (doctorId: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: {
      id: true,
      specialization: true,
      qualifications: true,
      experience: true,
      licenseNumber: true,
      isAvailable: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          dateOfBirth: true,
          gender: true,
          address: true,
          profileImage: true,
          isActive: true,
        },
      },
      department: {
        select: {
          id: true,
          name: true,
        },
      },
      fees: {
        select: {
          id: true,
          type: true,
          fee: true,
        },
      },
      schedules: {
        select: {
          id: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          isAvailable: true,
        },
      },
      reviews: {
        select: {
          id: true,
          comment: true,
          rating: true,
          patient: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  profileImage: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          reviews: true,
          appointments: {
            where: { status: "COMPLETED" },
          },
        },
      },
    },
  });

  if (!doctor) {
    throw new AppError(400, "Invalid Doctor ID");
  }

  const {
    id,
    specialization,
    qualifications,
    experience,
    licenseNumber,
    isAvailable,
    user,
    department,
    fees,
    schedules,
    reviews,
    _count,
  } = doctor;

  const totalReviews = _count?.reviews || 0;
  const averageRating =
    reviews.length > 0
      ? parseFloat(
          (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(2),
        )
      : 0;

  const result = {
    id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    address: user.address,
    profileImage: user.profileImage,
    specialization,
    qualifications,
    experience,
    licenseNumber,
    isAvailable,
    isActive: user.isActive,
    userId: user.id,
    department,
    fees,
    schedules,
    reviews,
    totalReviews,
    averageRating,
    completedAppointments: _count?.appointments || 0,
  };

  return result;
};

// ======================================
//                Admin
// ======================================

// Get Users
const getUsers = async (filters: TGetUsersFilter) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);

  const { search, active, role, sortBy, sortOrder } = filters;

  const where: Prisma.UserWhereInput = {};

  if (role) {
    where.role = role;
  }

  if (active) {
    if (active === "yes" || active === "no") {
      where.isActive = active === "yes" ? true : false;
    }
  }

  if (search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const select: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    dateOfBirth: true,
    gender: true,
    address: true,
    profileImage: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  };

  const result = await paginate({
    model: prisma.user,
    where: where,
    select,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  return result;
};

// Update User Status
const updateUserStatus = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { isActive: user.isActive ? false : true },
  });

  return null;
};

// Delete User
const deleteUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  // Soft Delete
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });

  return user;
};

export const userService = {
  getUserProfile,
  updatePatientProfile,
  updateDoctorProfile,
  updateAdminProfile,
  getDoctors,
  getDoctorDetails,
  getUsers,
  updateUserStatus,
  deleteUser,
};
