import mongoose from "mongoose";

//for arguments
interface PaymentAttrs {
  order_id: string;
  stripe_id: string;
}

//for document
interface PaymentDoc extends mongoose.Document {
  order_id: string;
  stripe_id: string;
}
//for model
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build: (attrs: PaymentAttrs) => PaymentDoc;
}

const paymentScheme = new mongoose.Schema(
  {
    order_id: {
      type: String,
      require: true,
    },
    stripe_id: {
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
paymentScheme.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentScheme
);

export { Payment };
