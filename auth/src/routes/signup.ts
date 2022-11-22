import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import DatabaseConnectionError from "../error/DatabaseConnectionError";
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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      throw Error("something went wrong");
    }
    console.log("Creating a user...");
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
