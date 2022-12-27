import mongoose from "mongoose";

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
}

//for entire collection types
interface TicketModel extends mongoose.Model<TicketDoc> {
  build: (attrs: TicketAttrs) => TicketAttrs;
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

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
