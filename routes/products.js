import express from "express";
const router = express.Router();
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductCount,
    getFeaturedProducts
  } from "../controllers/product.js";

router.post('/create', createProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/get/count', getProductCount)
router.get('/get/features/:count', getFeaturedProducts)


export default router;