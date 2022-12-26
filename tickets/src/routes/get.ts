import express from "express";
import { BadRequest } from "@jeffery_microservice/common";

import { Ticket } from "../model";

const ticketSingleRouter = express.Router();

ticketSingleRouter.get("/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new BadRequest("Ticket Not Found");
  }

  return res.json(ticket);
});

export { ticketSingleRouter };
