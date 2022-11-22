import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    type: "Unknown",
    msg: "Something went wrong",
  });
};
