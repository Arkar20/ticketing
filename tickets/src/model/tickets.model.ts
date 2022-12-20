import mongoose from "mongoose";

// attrs that's gonna give as parameters
interface ticketAttrs {
  title: string;
  desc: string;
  user_id?: string;
}

// for single doc in mongo
interface ticketDoc extends mongoose.Document {
  title: string;
  desc: string;
  user_id: string;
}

//for entire doc in mongo
interface ticketModel extends mongoose.Model<ticketDoc> {
  build: (attrs: ticketAttrs) => ticketDoc;
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
    user_id: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: ticketAttrs) => {
  return new Ticket(attrs);
};
const Ticket = mongoose.model<ticketDoc, ticketModel>("ticket", ticketSchema);

export { Ticket };
