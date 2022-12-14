import mongoose from "mongoose";
import PasswordGenerator from "../services/password";

//for attrs that require to pass
interface UserAttrs {
  email: String;
  password: String;
}

//for new build fun type hinting
interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//for single doc in a collection type hinting
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;

        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashPassword = await PasswordGenerator.toHash(this.get("password"));

    this.set("password", hashPassword);
  }
  next();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModal>("User", UserSchema);

export { User };
