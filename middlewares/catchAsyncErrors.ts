import { NextApiRequest, NextApiResponse } from "next";
import ErrorHandler from "@/utils/ErrorHandler";

const catchAsyncErrors =
  (fn: any) => async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    await fn(req, res, next).catch((err: any) => {
      err.statusCode = err.statusCode || 500;
      err.status = err.status || "error";

      process.env.NODE_ENV === "development"
        ? handleDevError(err, res)
        : handleProdError(err, res);
    });
  };

export default catchAsyncErrors;

export function handleDevError(err: any, res: NextApiResponse) {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

export function handleProdError(err: any, res: NextApiResponse) {
  const mongoDbError = {
    CastError: () => getCastError(err),
    ValidationError: () => getValidationError(err),
  };

  const error = mongoDbError[err.name as keyof typeof mongoDbError];
  err = error ? error() : err;

  res.status(err.isOperational ? err.statusCode : 500).json({
    status: err.isOperational ? err.status : "error",
    message: err.isOperational ? err.message : "Something went wrong!",
  });
}

export function getCastError(err: any) {
  return new ErrorHandler(`Invalid ${err.path}: ${err.value}`, 400);
}

export function getValidationError(err: any) {
  const message = Object.values(err.errors)
    .map((e: any) => e.message)
    .join(" .");
  return new ErrorHandler(message, 400);
}
