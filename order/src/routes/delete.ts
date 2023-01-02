import express, { Request, Response } from "express";
import {
  auth,
  OrderStatus,
  Unauthorize,
  validationHandler,
} from "@jeffery_microservice/common";
import { Order, Ticket } from "../model";
import { param } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publisher/TicketUpdatedPublisher";
import { natsWrapper, natsWrapper as NatsWrapper } from "../nats-connect";
import { BadRequest } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import { OrderCancelledEvent } from "../events/publisher/OrderCancelEvent";
const orderDeleteRoute = express.Router();

orderDeleteRoute.delete(
  "/orders/:id",
  auth,
  [
    param("id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Mal Form ID value"),
  ],
  validationHandler,

  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate("ticket");
    if (!order) {
      throw new BadRequest("Order not found");
    }

    if (order.user_id !== req.currentUser!.id) {
      throw new Unauthorize("You are authorized to cancel.");
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledEvent(natsWrapper.stan).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
        desc: order.ticket.desc,
        title: order.ticket.title,
      },
    });

    return res.status(201).send(order);
  }
);

export { orderDeleteRoute };
