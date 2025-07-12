import { PaginatedResult } from "../types/pagination";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function paginate<Where, Select, Result>({
  model,
  page = 1,
  limit = 10,
  where,
  select,
  sortBy = "createdAt",
  sortOrder = "desc",
  customSorting,
}: {
  model: any;
  page?: number | string;
  limit?: number | string;
  where?: Where;
  select?: Select;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  customSorting?: any;
}): Promise<PaginatedResult<Result>> {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      where: where ? where : {},
      select,
      skip,
      take: limit,
      orderBy: customSorting ? customSorting : { [sortBy]: sortOrder },
    }),
    model.count({ where }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
