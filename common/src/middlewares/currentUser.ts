import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserDecoded {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDecoded;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    next();
  }

  try {
    var decoded = jwt.verify(req.session?.jwt, process.env.JWT_SECRET!) as
      | UserDecoded
      | undefined;

    req.currentUser = decoded;
  } catch (err) {}
  next();
};
