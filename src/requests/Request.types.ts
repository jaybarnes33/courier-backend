import { User } from "../user/User.types";
import { Driver } from "../driver/Driver.types";
import { Document } from "mongoose";

export interface RideRequest extends Document {
  passenger: User;
  driver: Driver;
  pickupLocation: {
    latitude: number;
    longitude: number;
    placeName: string;
  };
  dropoffLocation: {
    latitude: number;
    longitude: number;
    placeName: string;
  };
  price: number;

  status: "pending" | "accepted" | "completed" | "cancelled";
  createdAt: string;
}
