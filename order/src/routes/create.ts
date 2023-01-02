import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { natsWrapper } from "../nats-connect";
import {
  auth,
  BadRequest,
  OrderStatus,
  validationHandler,
} from "@jeffery_microservice/common";
import { Order, Ticket } from "../model";
import { body } from "express-validator";

import { OrderCreatedEvent } from "../events/publisher/OrderCreateEvent";

const orderCreateRoute = express.Router();

const EXPIRE_DURATION = 15 * 60;
orderCreateRoute.post(
  "/orders",
  auth,
  [
    body("ticket_id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Mal Form ID value"),
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

    new OrderCreatedEvent(natsWrapper.stan).publish({
      id: order.id,
      status: order.status,
      expire_at: order.expire_at.toISOString(),
      version: order.version,
      user_id: order.user_id,
      ticket: {
        id: ticket.id,
        price: ticket.price,
        desc: ticket.desc,
        title: ticket.title,
      },
    });

    return res.status(201).send(order);
  }
);

export { orderCreateRoute };
