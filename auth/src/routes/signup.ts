import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/signup", (req, res) => {
  return res.send("sign up route");
});

export { router as signupRouter };
