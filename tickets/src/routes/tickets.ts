import express, { Request, Response } from "express";
import { auth } from "@jeffery_microservice/common";
import { Ticket } from "../model";
const ticketRouter = express.Router();

ticketRouter.post("/tickets", auth, async (req: Request, res: Response) => {
  const { title, desc } = req.body;

  const user_id = req.currentUser!.id;

  const ticket = await Ticket.build({ title, desc, user_id }).save();

  return res.status(201).send(ticket);
});

export default ticketRouter;
