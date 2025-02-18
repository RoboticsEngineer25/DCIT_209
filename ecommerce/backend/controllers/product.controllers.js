import db from "../lib/db.js";
import { products } from "../lib/ormSchema.js";
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
        folder: "products", // Organize images in a folder
        resource_type: "auto", // Auto-detect file type
      }
    );
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export async function addProduct(req, res) {
  try {
    const {
      categoryId,
      productName,
      price,
      description,
      stockQuantity,
      sku,
      productImage,
      isActive,
    } = req.body;

    // Validate required fields
    if (!categoryId || !productName || !price || !productImage) {
      return res
        .status(400)
        .json({
          message: "Category, product name, price, and SKU are required.",
        });
    }

    let imageUrl = null;
    if (productImage) {
      try {
        imageUrl = await uploadImageToCloudinary(productImage);
      } catch (error) {
        return res.status(400).json({ error: "Failed to upload image." });
      }
    }

    // Insert a new product into the database
    const newProduct = await db.insert(products).values({
      categoryId,
      productName,
      price,
      description: description || null,
      stockQuantity: stockQuantity || 0,
      sku,
      productImageUrl: imageUrl, // Use the Cloudinary URL
      isActive: isActive !== undefined ? isActive : true, // Default to active
    });

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
}

export async function getAllProducts(req, res) {
  try {
    // Get all products from the database
    const productList = await db.select().from(products);

    res.status(200).json(productList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    // Get a product by its ID from the database
    const product = await db
      .select()
      .from(products)
      .where(eq(products.productId, id))
      .limit(1);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const {
    categoryId,
    productName,
    price,
    description,
    stockQuantity,
    sku,
    productImage,
    isActive,
  } = req.body;

  try {
    let updateData = {
      categoryId,
      productName,
      price,
      description: description || null,
      stockQuantity: stockQuantity || 0,
      sku,
      isActive: isActive !== undefined ? isActive : true, // Default to active
    };

    // If there's a new image, upload it and update the URL
    if (productImage) {
      try {
        // Get the current product to check for existing image
        const currentProduct = await db
          .select()
          .from(products)
          .where(eq(products.productId, id));

        if (currentProduct[0]?.productImageUrl) {
          // Extract public_id from the existing URL
          const publicId = currentProduct[0].productImageUrl
            .split("/")
            .slice(-1)[0]
            .split(".")[0];
          // Delete the old image
          await cloudinary.uploader.destroy(`products/${publicId}`);
        }

        // Upload new image
        const imageUrl = await uploadImageToCloudinary(productImage);
        updateData.productImageUrl = imageUrl;
      } catch (error) {
        return res.status(400).json({ error: "Failed to update image." });
      }
    }

    // Update the product with all the data
    const updatedProduct = await db
      .update(products)
      .set(updateData)
      .where(eq(products.productId, id));

    if (updatedProduct.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    // Get the product to check for image
    const product = await db
      .select()
      .from(products)
      .where(eq(products.productId, id));

    if (product[0]?.productImageUrl) {
      try {
        // Extract public_id from the URL
        const publicId = product[0].productImageUrl
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        // Continue with product deletion even if image deletion fails
      }
    }

    const deletedProduct = await db
      .delete(products)
      .where(eq(products.productId, id));

    if (deletedProduct.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
}
export async function getProductsByCategoryId(req, res) {
  const { categoryId } = req.params; // Extract categoryId from the request parameters

  try {
    // Query the database to get products with the specified categoryId
    const productsList = await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId));

    // If no products are found, return a 404 response
    if (productsList.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category." });
    }

    // Return the list of products
    res.status(200).json(productsList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error fetching products by category",
        error: error.message,
      });
  }
}