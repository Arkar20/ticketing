import express, { Request, Response } from "express";
import {
  auth,
  BadRequest,
  OrderStatus,
  validationHandler,
} from "@jeffery_microservice/common";
import { Order, Ticket } from "../model";
import { body } from "express-validator";
import mongoose from "mongoose";

const orderCreateRoute = express.Router();

orderCreateRoute.post(
  "/orders",
  auth,
  [
    body("ticket_id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)),
  ],
  validationHandler,

  async (req: Request, res: Response) => {
    const { ticket_id } = req.body;

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) {
      throw new BadRequest("No Ticket is Found");
    }

    const ticketIsAlreadyOrder = await Order.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });

    if (ticketIsAlreadyOrder) {
      throw new BadRequest("Ticket is already reserved");
    }

    //create the order

    return res.status(201).send("post order route");
  }
);

export { orderCreateRoute };
