import { products } from "../lib/ormSchema.js";
import db from "../lib/db.js";
import { eq } from "drizzle-orm";

export async function addProduct(req, res) {
    try {
        const {
            categoryId, productName, price, description,
            stockQuantity, sku, productImageUrl, isActive
        } = req.body;

        // Validate required fields
        if (!categoryId || !productName || !price || !sku) {
            return res.status(400).json({ message: "Category, product name, price, and SKU are required." });
        }

        // Insert a new product into the database
        const newProduct = await db.insert(products).values({
            categoryId,
            productName,
            price,
            description: description || null,
            stockQuantity: stockQuantity || 0,
            sku,
            productImageUrl: productImageUrl || null,
            isActive: isActive !== undefined ? isActive : true, // Default to active
        });

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
}

export async function getAllProducts(req, res) {
    try {
        // Get all products from the database
        const productList = await db.select().from(products);

        res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

export async function getProductById(req, res) {
    const { id } = req.params;
    try {
        // Get a product by its ID from the database
        const product = await db.select().from(products).where(eq(products.productId, id)).limit(1);

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const {
        categoryId, productName, price, description,
        stockQuantity, sku, productImageUrl, isActive
    } = req.body;

    try {
        // Update a product's details
        const updatedProduct = await db
            .update(products)
            .set({
                categoryId,
                productName,
                price,
                description: description || null,
                stockQuantity: stockQuantity || 0,
                sku,
                productImageUrl: productImageUrl || null,
                isActive: isActive !== undefined ? isActive : true, // Default to active
            })
            .where(eq(products.productId, id));

        if (updatedProduct.numAffectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;

    try {
        // Delete the product from the database
        const deletedProduct = await db.delete(products).where(eq(products.productId, id));

        if (deletedProduct.numAffectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
}
