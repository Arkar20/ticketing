import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import DatabaseConnectionError from "../error/DatabaseConnectionError";
import { User } from "../models";
const router = express.Router();

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
      console.log(errors.array());
      throw Error("something went wrong");
    }

    if (await User.findOne({ email })) {
      return res.send("User Email Exists");
    }
    console.log("Creating a user...");
    const user = await User.build({ email, password });
    user.save();

    return res.json(user);
  }
);

export { router as signupRouter };
