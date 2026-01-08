import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const posterImage = req?.file?.path;
    // console.log("poster image ", posterImage);
    const payload = {
      ...req.body,
      poster: posterImage || "",
    };

    const result = await ProductService.createProduct(payload);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId as unknown as number;

    const posterImage = req?.file?.path;

    const payload = {
      ...req.body,
      ...(posterImage && { poster: posterImage }),
    };

    const result = await ProductService.updateProduct(productId, payload);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await ProductService.getAllProducts(page, limit);

  res.status(200).json({
    success: true,
    data: result.data,
  });
};

export const ProductController = {
  createProduct,
  updateProduct,
  getAllProducts,
};
