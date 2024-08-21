import { Document, Schema } from "mongoose";

export interface Driver extends Document {
  name?: string;
  email?: string;
  otp?: string;
  phone: string;
  password: string;
  currentLocation?: string;
  createdAt: Date;
  vehicleType?: string;
  avatar?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  verificationStatus?: string;
  vehicleDetails?: {
    make: string;
    model: string;
    year: number;
    color: string;
    number: string;
  };
  verificationDocument?: string;
}
