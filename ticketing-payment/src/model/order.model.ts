import { OrderStatus } from "@jeffery_microservice/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
//for argurments types
interface OrderAttrs {
  id: string;
  version: number;
  user_id: string;
  price: number;
  status: string;
}
//for single doc typs
interface OrderDoc extends mongoose.Document {
  version: number;
  user_id: string;
  price: number;
  status: OrderStatus;
}

// for entire collection types
interface OrderModel extends mongoose.Model<OrderDoc> {
  build: (attrs: OrderAttrs) => OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      require: true,
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
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    status: attrs.status,
    version: attrs.version,
    price: attrs.price,
    user_id: attrs.user_id,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
