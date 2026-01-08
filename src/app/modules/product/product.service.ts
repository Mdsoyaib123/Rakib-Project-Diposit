import { ProductModel } from "./product.model";
import { TProduct } from "./product.interface";

const generateUnique4DigitProductId = async (): Promise<number> => {
  for (let i = 0; i < 10; i++) {
    const productId = Math.floor(1000 + Math.random() * 9000);

    const exists = await ProductModel.exists({ productId });
    if (!exists) return productId;
  }

  throw new Error("All 4-digit product IDs are exhausted");
};

const createProduct = async (payload: TProduct) => {
  // console.log("product pyload", payload);
  payload.productId = await generateUnique4DigitProductId();
  payload.salePrice = Number(payload.price) + Number(payload.commission);

  const product = await ProductModel.create(payload);
  return product;
};

const updateProduct = async (productId: number, payload: Partial<TProduct>) => {
  // Recalculate salePrice if price or commission changes
  if (payload.price !== undefined || payload.commission !== undefined) {
    const existingProduct = await ProductModel.findOne({
      productId: productId,
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    payload.salePrice =
      Number(payload.price ?? existingProduct.price) +
      Number(payload.commission ?? existingProduct.commission);
  }

  const updatedProduct = await ProductModel.findOneAndUpdate(
    { productId: productId },
    payload,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};
// product.service.ts
const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    ProductModel.find().sort({ salePrice: -1 }).skip(skip).limit(limit),

    ProductModel.countDocuments(),
  ]);

  return {
    data,
  };
};

export const ProductService = {
  createProduct,
  updateProduct,
  getAllProducts,
};
