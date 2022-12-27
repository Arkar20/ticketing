import mongoose from "mongoose";
import { OrderStatus } from "@jeffery_microservice/common";
// for parameters types
interface OrderAttrs {
  user_id: string;
  status: OrderStatus;
  expire_at: string;
}
//for single doc types
interface OrderDoc extends mongoose.Document {
  user_id: string;
  status: OrderStatus;
  expire_at: string;
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
    },
    expire_at: {
      type: mongoose.Schema.Types.Date,
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

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export { Order };
