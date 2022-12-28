import express, { Request, Response } from "express";
import { auth, Unauthorize, BadRequest } from "@jeffery_microservice/common";
import { Order } from "../model";
import { param } from "express-validator";
import mongoose from "mongoose";

const orderSingleRouter = express.Router();

orderSingleRouter.get(
  "/orders/:id",
  auth,
  [
    param("id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Mal Form ID value"),
  ],
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new BadRequest("Your order is not found");
    }

    if (order.user_id !== req.currentUser!.id) {
      throw new Unauthorize("You are not allowed to viewed this order");
    }

    return res.status(200).json(order);
  }
);

export { orderSingleRouter };
