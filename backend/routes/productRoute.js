import express from "express"
import {createProduct,getProducts,updateProduct,deleteProduct,findOneProduct} from "../controllers/productController.js"
const router = express.Router()

router.post("/", createProduct);         // POST /api/products
router.get("/", getProducts);           // GET /api/products
router.put("/:id", updateProduct);      // PUT /api/products/:id
router.delete("/:id", deleteProduct);   // DELETE /api/products/:id
router.get("/:id",findOneProduct)       // GetOne /api/products/:id

export default router;