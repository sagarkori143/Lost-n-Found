import mongoose, { Schema, Document } from "mongoose";

// Interface for the Item model
export interface IItem extends Document {
  title: string; // Mandatory
  description: string; // Mandatory
  dateLostFound: Date; // Mandatory
  dateAdded: Date; // Automatically saved when the item is created
  phone?: string; // Optional
  whatsapp?: string; // Optional
  email?: string; // Optional
  username?: string; // Optional
  collegeEmail?: string; // Optional
  rollNo?: string; // Optional
  photoURL?: string; // Optional
  imageUrls?: string[]; // Optional
  status: string; // Mandatory
  type: string; // Mandatory
}

// Main Item schema
const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateLostFound: { type: Date, required: true },
  dateAdded: { type: Date, default: Date.now },
  phone: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  username: { type: String },
  collegeEmail: { type: String },
  rollNo: { type: String },
  photoURL: { type: String },
  imageUrls: { type: [String], default: [] },
  status: { type: String, required: true },
  type: { type: String, required: true },
});

// Custom validation to ensure at least one contact detail is provided
ItemSchema.pre("validate", function (next) {
  if (!this.phone && !this.whatsapp && !this.email) {
    return next(new Error("At least one contact detail (phone, whatsapp, or email) is required."));
  }
  next();
});

// Export the model
export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
