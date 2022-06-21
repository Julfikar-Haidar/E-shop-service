import express from "express";
const router = express.Router();
import { 
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
 } from '../controllers/category.js';
  

router.post('/create', createCategory)
router.get('/', getCategory)
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)


export default router;