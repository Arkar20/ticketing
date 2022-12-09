import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "cookie-session";
const router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.json({ currentuser: null });
  }

  try {
    var decoded = jwt.verify(req.session.jwt, process.env.JWT_SECRET!);

    return res.json({ currentuser: decoded });
  } catch (err) {
    return res.json({ currentuser: null });
  }
});

export { router as currentUserRouter };
