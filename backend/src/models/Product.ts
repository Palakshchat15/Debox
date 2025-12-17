import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: mongoose.Types.ObjectId[];
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: false },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

export default mongoose.model<IProduct>("Product", ProductSchema);
