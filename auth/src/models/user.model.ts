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
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model<UserDoc, UserModal>("User", UserSchema);

UserSchema.pre("save", function (next) {
  console.log("hashing password");
  if (this.isModified("password")) {
    const hashPassword = PasswordGenerator.toHash(this.get("password"));

    this.set("password", hashPassword);
  }
  next();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
