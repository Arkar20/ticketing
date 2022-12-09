import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models";

import ExpressValidationError from "../error/ExpressValidationError";
import BadRequest from "../error/BadRequest";
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      throw new ExpressValidationError(errors.array());
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequest("Email Has Already Exited");
    }

    console.log("Creating a user...");
    const user = User.build({ email, password });
    await user.save();
    const token = jwt.sign({ id: user.id }, "shhhhh");

    req.session = {
      jwt: token,
    };
    return res.json(user);
  }
);

export { router as signupRouter };
