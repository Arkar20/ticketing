import mongoose from "mongoose";
import { OrderStatus } from "@jeffery_microservice/common";
import { TicketDoc } from "./index";
// for parameters types
interface OrderAttrs {
  user_id: string;
  status: OrderStatus;
  expire_at: Date;
  ticket: TicketDoc;
}
//for single doc types
interface OrderDoc extends mongoose.Document {
  user_id: string;
  status: OrderStatus;
  expire_at: Date;
  ticket: TicketDoc;
}
//for entire model types
interface OrderModel extends mongoose.Model<OrderDoc> {
  build: (attrs: OrderAttrs) => OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expire_at: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
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
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
