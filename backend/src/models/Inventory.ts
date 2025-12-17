import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  productId: mongoose.Types.ObjectId;
  available: number;
  sold: number;
}

const InventorySchema: Schema<IInventory> = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true,
  },
  available: { type: Number, required: true },
  sold: { type: Number, required: true },
});

export default mongoose.model<IInventory>("Inventory", InventorySchema);
