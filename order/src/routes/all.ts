import express, { Request, Response } from "express";
import { auth } from "@jeffery_microservice/common";
import { Order } from "../model";

const orderGetAllRouter = express.Router();

orderGetAllRouter.get("/orders", auth, async (req: Request, res: Response) => {
  const orders = await Order.find({ user_id: req.currentUser!.id }).populate(
    "ticket"
  );

  return res.send(orders);
});

export { orderGetAllRouter };
