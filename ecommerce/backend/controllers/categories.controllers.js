import db from "../lib/db.js";
import { categories } from "../lib/ormSchema.js";
import { eq } from "drizzle-orm";

export async function addCategory(req, res) {
    try {
        const { categoryName, parentCategoryId } = req.body;

        if (!categoryName) {
            return res.status(400).json({ error: "Category name is required." });
        }

        const result = await db.insert(categories).values({
            categoryName,
            parentCategoryId: parentCategoryId || null, // Allow null for root categories
        });
        const category = await db
          .select()
          .from(categories)
          .where(eq(categories.categoryName, categoryName));


        res.status(201).json({ message: "Category added successfully.", data: result,category });
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function getAllCategories(req, res) {
    try {
        const allCategories = await db.select().from(categories);

        res.status(200).json({ data: allCategories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function getCategoryById(req, res) {
    try {
        const { id } = req.params;

        const category = await db.select().from(categories).where(eq(categories.categoryId, id));

        if (category.length === 0) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json({ data: category[0] });
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { categoryName, parentCategoryId } = req.body;

        // Update the category with the provided name and parent category ID
        const result = await db
            .update(categories)
            .set({ categoryName, parentCategoryId })
            .where(eq(categories.categoryId, id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json({ message: "Category updated successfully." });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const result = await db.delete(categories).where(eq(categories.categoryId, id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
