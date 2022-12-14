import mongoose from "mongoose";
import { OrderStatus } from "@jeffery_microservice/common";
import { TicketDoc } from "./index";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

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
  version: number;
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

orderSchema.set("versionKey", "version");

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

orderSchema.plugin(updateIfCurrentPlugin);

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
