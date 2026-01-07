import { ProductModel } from "./product.model";
import { TProduct } from "./product.interface";

const createProduct = async (payload: TProduct) => {
  payload.salePrice =
    payload.price - (payload.price * payload.commission) / 100;

  const product = await ProductModel.create(payload);
  return product;
};

const getAllProducts = async () => {
  return ProductModel.find().sort({ createdAt: -1 });
};

export const ProductService = {
  createProduct,
  getAllProducts,
};
