import mongoose from "mongoose";
import { Order } from "./index";
import { OrderStatus } from "@jeffery_microservice/common";
//for paramaters attrs types
interface TicketAttrs {
  title: String;
  desc: String;
  price: Number;
}

//for single doc types
interface TicketDoc extends mongoose.Document {
  title: String;
  desc: String;
  price: Number;
  isReserved: () => Promise<boolean>;
}

//for entire collection types
interface TicketModel extends mongoose.Model<TicketDoc> {
  build: (attrs: TicketAttrs) => TicketDoc;
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
  return new Ticket(attrs);
};

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

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket, TicketDoc };
