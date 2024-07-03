import { Document, Schema } from "mongoose";

export interface Package extends Document {
  senderName: string;
  pickup: Place;
  senderPhone: string;
  receiverPhone: string;
  receiverName: string;

  dropoff: Place;
  packageSize: "small" | "medium" | "large";
  deliveryTime: Date;
  status: "pending" | "assigned" | "in_progress" | "delivered";
  assignedTo?: Schema.Types.ObjectId | string;
  createdAt: Date;
}

export interface Place {
  name: string;
  latLng: string;
}
