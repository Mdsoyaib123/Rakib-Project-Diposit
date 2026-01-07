import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    commission: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    introduction: { type: String, required: true },
    poster: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductModel = model<TProduct>("Product", productSchema);
