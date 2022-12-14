import { Request, Response, NextFunction } from "express";
import { Unauthorize } from "../error/Unauthorized";
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new Unauthorize("You are not Authorized");
  }
  next();
};
