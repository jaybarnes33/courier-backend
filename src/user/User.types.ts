import { Document, Schema } from "mongoose";

export interface User extends Document {
  name?: string;
  email?: string;
  otp?: string;
  phone: string;
  createdAt: Date;
  avatar?: string;
}
