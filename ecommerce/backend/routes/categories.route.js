import express from 'express';
import {addCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory} from '../controllers/categories.controllers.js';

const router = express.Router();

// Add a new category
router.post('/', addCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
