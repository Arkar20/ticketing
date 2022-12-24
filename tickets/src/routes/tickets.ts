import express, { Request, Response } from "express";
import { auth, validationHandler } from "@jeffery_microservice/common";
import { Ticket } from "../model";
import { body } from "express-validator";
import { TicketCreatedPublisher } from "../events/publisher/TicketCreatePublisher";
import NatsWrapper from "../nats-connect";
const ticketRouter = express.Router();

ticketRouter.post(
  "/tickets",
  auth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("desc").not().isEmpty().withMessage("Desc is required"),
  ],
  validationHandler,

  async (req: Request, res: Response) => {
    const { title, desc } = req.body;

    const user_id = req.currentUser!.id;

    const ticket = await Ticket.build({ title, desc, user_id }).save();

    await new TicketCreatedPublisher(NatsWrapper.stan).publish({
      id: ticket.id,
      title: ticket.title,
      desc: ticket.desc,
    });

    return res.status(201).send(ticket);
  }
);

export default ticketRouter;
