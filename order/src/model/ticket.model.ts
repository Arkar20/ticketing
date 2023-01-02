import mongoose from "mongoose";
import { Order } from "./index";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@jeffery_microservice/common";

//for paramaters attrs types
interface TicketAttrs {
  id: string;
  title: string;
  desc: string;
  price: number;
}

//for single doc types
interface TicketDoc extends mongoose.Document {
  title: string;
  desc: string;
  price: number;
  version: number;
  isReserved: () => Promise<boolean>;
}

//for entire collection types
interface TicketModel extends mongoose.Model<TicketDoc> {
  build: (attrs: TicketAttrs) => TicketDoc;
  findByEvent: (event: {
    id: string;
    version: number;
  }) => Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    desc: attrs.desc,
    price: attrs.price,
  });
};

ticketSchema.set("versionKey", "version");

ticketSchema.methods.isReserved = async function () {
  const ticketIsAlreadyOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!ticketIsAlreadyOrder;
};

ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: Number(event.version) - 1,
  });
};
ticketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket, TicketDoc };
