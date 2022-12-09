import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models";
import { validationHandler } from "../middlewares";
import BadRequest from "../error/BadRequest";
const router = express.Router();
import "express-async-errors";
import PasswordGenerator from "../services/password";
import jwt from "jsonwebtoken";
import "cookie-session";
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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequest("User Does Not Exists");
    }
    const passwordMatch = await PasswordGenerator.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequest("Invalid Credential");
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!);

    req.session = {
      jwt: token,
    };

    return res.send(existingUser);
  }
);

export { router as signinRouter };
