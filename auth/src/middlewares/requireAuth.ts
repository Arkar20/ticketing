import { Request, Response, NextFunction } from "express";
import Unautorize from "../error/Unauthorized";
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new Unautorize("You are not Authorized");
  }
  next();
};
