import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validationHandler } from "../middlewares";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validationHandler,
  (req: Request, res: Response) => {
    return res.send("hello world");
  }
);

export { router as signinRouter };
