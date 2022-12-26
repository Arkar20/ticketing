import express, { Request, Response } from "express";
import {
  auth,
  Unauthorize,
  validationHandler,
} from "@jeffery_microservice/common";
import { Ticket } from "../model";
import { body } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publisher/TicketUpdatedPublisher";
import { natsWrapper as NatsWrapper } from "../nats-connect";
import { BadRequest } from "@jeffery_microservice/common";
const ticketUpdateRoute = express.Router();

ticketUpdateRoute.put(
  "/tickets/:id",
  auth,
  [
    body("title").exists({checkFalsy:false}).withMessage("Title is required"),
    body("desc").exists({checkFalsy:false}).withMessage("Desc is required"),
    body("price").exists({checkFalsy:false}).isFloat().withMessage("Price is required"),
  ],
  validationHandler,

  async (req: Request, res: Response) => {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new BadRequest("Not Found");
    }

    if (
      process.env.NODE_ENV !== "test" &&
      ticket.user_id !== req.currentUser!.id
    ) {
      throw new Unauthorize("You are not allowed to edit this ticket");
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
      desc:req.body.desc
    });
    await ticket.save();

    await new TicketUpdatedPublisher(NatsWrapper.stan).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      desc: ticket.desc,
    });

    return res.status(201).send(ticket);
  }
);

export { ticketUpdateRoute };
