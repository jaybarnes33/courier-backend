import { Document, Schema } from "mongoose";

export interface Rider extends Document {
  name?: string;
  email?: string;
  otp?: string;
  phoneNumber: string;
  password: string;
  currentLocation?: string;
  createdAt: Date;
  vehicleType?: string;
  avatar?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  vehicleNumber?: string;
}
