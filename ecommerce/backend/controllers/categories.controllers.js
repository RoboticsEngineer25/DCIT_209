import db from "../lib/db.js";
import { categories } from "../lib/ormSchema.js";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
async function uploadImageToCloudinary(base64Image) {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        folder: "categories", // Organize images in a folder
        resource_type: "auto", // Auto-detect file type
      }
    );
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function addCategory(req, res) {
  try {
    const { categoryName, parentCategoryId, categoryImage } = req.body;

    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required." });
    }

    let imageUrl = null;
    if (categoryImage) {
      try {
        imageUrl = await uploadImageToCloudinary(categoryImage);
      } catch (error) {
        return res.status(400).json({ error: "Failed to upload image." });
      }
    }

    // Insert category with image URL
    const result = await db.insert(categories).values({
      categoryName,
      parentCategoryId: parentCategoryId || null,
      imageUrl: imageUrl, // Add the Cloudinary URL to the database
    });

    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.categoryName, categoryName));

    res.status(201).json({
      message: "Category added successfully.",
      data: result,
      category,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { categoryName, parentCategoryId, categoryImage } = req.body;

    let updateData = {
      categoryName,
      parentCategoryId,
    };

    // If there's a new image, upload it and update the URL
    if (categoryImage) {
      try {
        // Get the current category to check for existing image
        const currentCategory = await db
          .select()
          .from(categories)
          .where(eq(categories.categoryId, id));

        if (currentCategory[0]?.imageUrl) {
          // Extract public_id from the existing URL
          const publicId = currentCategory[0].imageUrl
            .split("/")
            .slice(-1)[0]
            .split(".")[0];
          // Delete the old image
          await cloudinary.uploader.destroy(`categories/${publicId}`);
        }

        // Upload new image
        const imageUrl = await uploadImageToCloudinary(categoryImage);
        updateData.imageUrl = imageUrl;
      } catch (error) {
        return res.status(400).json({ error: "Failed to update image." });
      }
    }

    // Update the category with all the data
    const result = await db
      .update(categories)
      .set(updateData)
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

    // Get the category to check for image
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.categoryId, id));

    if (category[0]?.imageUrl) {
      try {
        // Extract public_id from the URL
        const publicId = category[0].imageUrl
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        // Continue with category deletion even if image deletion fails
      }
    }

    const result = await db
      .delete(categories)
      .where(eq(categories.categoryId, id));

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

// Existing getAllCategories and getCategoryById functions remain unchanged
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
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.categoryId, id));

    if (category.length === 0) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json({ data: category[0] });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
