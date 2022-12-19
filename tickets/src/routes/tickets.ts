import express, { Request, Response } from "express";
import { auth } from "@jeffery_microservice/common";

const ticketRouter = express.Router();

ticketRouter.get("/tickets", auth, (req: Request, res: Response) => {
  return res.send("api tickets route");
});

export default ticketRouter;
