import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models";
import "cookie-session";
import BadRequest from "../error/BadRequest";
import { validationHandler } from "../middlewares";

const router = express.Router();
import "express-async-errors";

import jwt from "jsonwebtoken";

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequest("Email Has Already Exited");
    }

    const user = User.build({ email, password });
    await user.save();
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    req.session = {
      jwt: token,
    };
    return res.json(user);
  }
);

export { router as signupRouter };
