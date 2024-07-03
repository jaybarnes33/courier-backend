import { Schema, model } from "mongoose";
import { Rider as RiderType } from "./Rider.types";
import bcrypt from "bcrypt";
const riderSchema = new Schema<RiderType>(
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
    password: {
      type: String,
    },
    vehicleNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    vehicleType: { type: String, enum: ["bike", "ped", "car"] },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number, Number],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Rider = model<RiderType>("Rider", riderSchema);
export default Rider;
