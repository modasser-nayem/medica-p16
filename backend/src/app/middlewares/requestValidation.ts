import { ZodSchema } from "zod";
import { asyncHandler } from "../utils/asyncHandler";

type RequestShape = {
  body?: unknown;
  params?: unknown;
  query?: unknown;
};

const requestValidate = <T extends RequestShape>(
  schema: ZodSchema<T>,
): ReturnType<typeof asyncHandler> => {
  return asyncHandler(async (req, res, next) => {
    const result = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (result.body !== undefined) req.body = result.body;
    if (result.params !== undefined && result.params !== null)
      req.params = result.params as typeof req.params;
    if (result.query !== undefined && result.query !== null)
      Object.assign(req.query, result.query);
    next();
  });
};

export default requestValidate;
