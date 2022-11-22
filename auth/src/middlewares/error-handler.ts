import { Request, Response, NextFunction } from "express";
import DatabaseConnectionError from "../error/DatabaseConnectionError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DatabaseConnectionError) {
    const error = new DatabaseConnectionError();
    return res.json({
      type: error.type,
      msg: error.reason,
    });
  }
};
