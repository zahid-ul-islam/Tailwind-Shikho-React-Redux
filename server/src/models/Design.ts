import mongoose, { Schema, Document } from "mongoose";

export interface IDesign extends Document {
  title: string;
  tailwindClasses: string;
  content: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const DesignSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    tailwindClasses: { type: String, default: "" },
    content: { type: String, default: "" },
    userId: { type: String, default: null }, // null for guest designs
  },
  { timestamps: true }
);

export default mongoose.model<IDesign>("Design", DesignSchema);
