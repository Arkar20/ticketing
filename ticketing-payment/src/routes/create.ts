import {
  auth,
  BadRequest,
  validationHandler,
  Unauthorize,
  OrderStatus,
} from "@jeffery_microservice/common";
import express, { Request, Response } from "express";

import { body } from "express-validator";
import { stripe } from "../stripe";

import { Order, Payment } from "../model";

const router = express.Router();

router.post(
  "/payments",
  auth,
  [
    body("token").not().isEmpty().withMessage("Token Is Required"),
    body("order_id").not().isEmpty().withMessage("Order ID Is Required"),
  ],
  validationHandler,
  async (req: Request, res: Response) => {
    const { token, order_id } = req.body;

    const order = await Order.findById(order_id);

    if (!order) {
      throw new BadRequest("Order Not Found");
    }

    if (order.user_id !== req.currentUser!.id) {
      throw new Unauthorize("You do not own the order");
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequest("Order is Cancelled");
    }

    const charge = await stripe.charges.create({
      amount: order.price * 100,
      currency: "usd",
      source: token,
      description: "My First Test Charge",
    });

    const payment = await Payment.build({
      stripe_id: charge.id,
      order_id: order.id,
    }).save();

    return res.status(200).send(payment);
  }
);

export { router as createRouter };
