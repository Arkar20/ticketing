import { Request, Response, NextFunction } from "express";
import { Unauthorize } from "../error";
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
