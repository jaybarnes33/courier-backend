import { Schema, model } from "mongoose";
import { User } from "./User.types";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>("User", userSchema);

export default UserModel;
