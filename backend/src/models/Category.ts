import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  products: mongoose.Types.ObjectId[];
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model<ICategory>("Category", CategorySchema);
