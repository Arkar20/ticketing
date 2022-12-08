import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../error/ErrorHandler";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res.status(500).json(err.seralize());
  }
  return res.status(500).send("Something went wrong");
};
