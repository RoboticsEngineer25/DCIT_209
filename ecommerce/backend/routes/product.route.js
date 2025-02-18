import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
} from "../controllers/product.controllers.js";

const router = express.Router();

router.post("/", addProduct);

router.get("/", getAllProducts);

router.get("/:categoryId", getProductsByCategoryId);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
