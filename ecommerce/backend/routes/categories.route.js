import express from 'express';
import {addCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory} from '../controllers/categories.controllers.js';

const router = express.Router();

// Add a new category
router.post('/categories', addCategory);

// Get all categories
router.get('/categories', getAllCategories);

// Get a category by ID
router.get('/categories/:id', getCategoryById);

// Update a category by ID
router.put('/categories/:id', updateCategory);

// Delete a category by ID
router.delete('/categories/:id', deleteCategory);

export default router;
