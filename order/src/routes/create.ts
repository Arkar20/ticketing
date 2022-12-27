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

const EXPIRE_DURATION = 15 * 60;
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

    const ticketIsAlreadyOrder = await ticket.isReserved();

    if (ticketIsAlreadyOrder) {
      throw new BadRequest("Ticket is already reserved");
    }
    const expireTime = new Date();
    expireTime.setSeconds(expireTime.getSeconds() + EXPIRE_DURATION);

    //create the order
    const order = await Order.build({
      user_id: req.currentUser!.id,
      status: OrderStatus.Created,
      expire_at: expireTime,
      ticket,
    }).save();

    return res.status(201).send(order);
  }
);

export { orderCreateRoute };
