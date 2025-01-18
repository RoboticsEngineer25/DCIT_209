import express from 'express';
import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.controllers.js';

const router = express.Router();

router.post('/', addProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
