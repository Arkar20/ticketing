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
const orderDeleteRoute = express.Router();

orderDeleteRoute.delete(
  "/orders/:id",
  auth,
  validationHandler,

  async (req: Request, res: Response) => {
    return res.status(201).send("update order route");
  }
);

export { orderDeleteRoute };
