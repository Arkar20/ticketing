import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ExpressValidationError from "../error/ExpressValidationError";

export const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ExpressValidationError(errors.array());
  }

  next();
};
