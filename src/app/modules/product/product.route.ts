import express from "express";
import { ProductController } from "./product.controller";
import multer from "multer";
import { createUploader } from "../../utils/cloudinary";

const router = express.Router();

const upload = createUploader('productImages')

router.post(
  "/create-product",
  upload.single("poster"),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;
