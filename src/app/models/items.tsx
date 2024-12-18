import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
  imageUrls: string[];
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrls: { type: [String], required: true },
});

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
