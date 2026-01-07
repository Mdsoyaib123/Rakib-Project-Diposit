import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    // console.log("poster image ", req.file);
    const payload = {
      ...req.body,
      poster: req?.file?.path || "",
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

const getAllProducts = async (_req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getAllProducts,
};
