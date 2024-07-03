import { Document, model, Schema } from "mongoose";
import { Package as PackageType } from "./Package.types";

const packageSchema = new Schema<PackageType>({
  senderName: {
    type: String,
    required: true,
  },
  senderPhone: {
    type: String,
    required: true,
  },
  pickup: {
    name: {
      type: String,
    },
    latLng: {
      type: String,
    },
  },
  receiverName: {
    type: String,
    required: true,
  },
  dropoff: {
    name: {
      type: String,
    },
    latLng: {
      type: String,
    },
  },
  receiverPhone: {
    type: String,
    required: true,
  },
  packageSize: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "medium",
  },
  deliveryTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "in_progress", "delivered"],
    default: "pending",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "Rider",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Package = model<PackageType>("Package", packageSchema);
export default Package;
