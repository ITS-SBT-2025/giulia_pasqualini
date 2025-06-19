import express from "express";
import * as productsController from "./products.controller.js";
import verifyToken from "../../middleware/verify-token.middleware.js";

const router = express.Router();

router.get("/:id", productsController.getProductById);
router.get("/", productsController.getAllProducts);
router.post("/", verifyToken, productsController.createProduct);
router.put("/:id", verifyToken, productsController.updateProduct);
router.delete("/:id", verifyToken, productsController.deleteProduct);

export default router;