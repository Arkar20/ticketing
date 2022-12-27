import express, { Request, Response } from "express";
import { auth, validationHandler } from "@jeffery_microservice/common";
import { Ticket } from "../model";
import { body } from "express-validator";
import { TicketCreatedPublisher } from "../events/publisher/TicketCreatePublisher";
import { natsWrapper as NatsWrapper } from "../nats-connect";

const orderCreateRoute = express.Router();

orderCreateRoute.post(
  "/orders",
  auth,
  validationHandler,

  async (req: Request, res: Response) => {
    return res.status(201).send("post order route");
  }
);

export { orderCreateRoute };
