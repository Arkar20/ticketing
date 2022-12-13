import express, { Request, Response } from "express";
import { currentUser } from "../middlewares";

import "cookie-session";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,

  (req: Request, res: Response) => {
    return res.json({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
