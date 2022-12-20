import express, { Request, Response } from "express";
import { auth } from "@jeffery_microservice/common";

const ticketRouter = express.Router();

ticketRouter.post("/tickets", auth, (req: Request, res: Response) => {
  return res.send(req.currentUser);
});

export default ticketRouter;
