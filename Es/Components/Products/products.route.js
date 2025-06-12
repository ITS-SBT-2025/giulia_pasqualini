import express from "express";
import * as productsController from "./products.controller.js";

const router = express.Router();

router.get("/:id", productsController.getProductById);
router.get("/", productsController.getAllProducts);
router.post("/", productsController.createProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

export default router;