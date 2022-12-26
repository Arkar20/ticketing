import express from "express";
import { Ticket } from "../model";

const ticketGetAllRouter = express.Router();

ticketGetAllRouter.get("/", async (req, res) => {
  const tickets = await Ticket.find({});

  return res.json(tickets);
});

export { ticketGetAllRouter };
