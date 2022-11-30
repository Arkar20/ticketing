import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../error/ErrorHandler";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return err.seralize();
  }
};
