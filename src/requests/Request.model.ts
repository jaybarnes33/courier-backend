import { Schema, model } from "mongoose";
import { RideRequest } from "./Request.types";
const rideRequestSchema = new Schema<RideRequest>(
  {
    passenger: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
    },
    pickupLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      placeName: {
        type: String,
        required: true,
      },
    },
    dropoffLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      placeName: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const RideRequestModel = model<RideRequest>("RideRequest", rideRequestSchema);

export default RideRequestModel;
