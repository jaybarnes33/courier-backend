import { Schema, model } from "mongoose";
import { Driver as DriverType } from "./Driver.types";

const driverSchema = new Schema<DriverType>(
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
    avatar: {
      type: String,
    },

    vehicleDetails: {
      make: {
        type: String,
      },
      model: {
        type: String,
      },
      year: {
        type: Number,
      },
      color: {
        type: String,
      },
      number: {
        type: String,
      },
    },

    phone: {
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
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verificationDocument: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Driver = model<DriverType>("Driver", driverSchema);
export default Driver;
