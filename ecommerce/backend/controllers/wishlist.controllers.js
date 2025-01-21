import { wishlist } from "../lib/ormSchema.js";
import db from "../lib/db.js";
import { eq } from "drizzle-orm";

// Add product to the wishlist
export async function addToWishlist(req, res) {
    const { userId, productId } = req.body;

    try {
        // Check if the product already exists in the wishlist for this user
        const existingWishlistItem = await db
            .select()
            .from(wishlist)
            .where(eq(wishlist.userId, userId))
            .and(eq(wishlist.productId, productId));

        if (existingWishlistItem.length > 0) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        // Insert new product to the wishlist
        const newWishlistItem = await db.insert(wishlist).values({
            userId,
            productId,
        });

        res.status(201).json({ message: "Product added to wishlist", wishlist: newWishlistItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product to wishlist", error: error.message });
    }
}

// Get all products in the user's wishlist
export async function getWishlist(req, res) {
    const { userId } = req.params;

    try {
        // Get all wishlist items for the user
        const wishlistItems = await db
            .select()
            .from(wishlist)
            .where(eq(wishlist.userId, userId));

        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
    }
}

// Remove product from the wishlist
export async function removeFromWishlist(req, res) {
    const { userId, productId } = req.params;

    try {
        // Delete the product from the wishlist
        const deletedItem = await db
            .delete(wishlist)
            .where(eq(wishlist.userId, userId))
            .and(eq(wishlist.productId, productId));

        if (deletedItem.numAffectedRows === 0) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        res.status(200).json({ message: "Product removed from wishlist" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing product from wishlist", error: error.message });
    }
}

// Clear all products in the user's wishlist
export async function clearWishlist(req, res) {
    const { userId } = req.params;

    try {
        // Delete all products from the user's wishlist
        const deletedItems = await db
            .delete(wishlist)
            .where(eq(wishlist.userId, userId));

        if (deletedItems.numAffectedRows === 0) {
            return res.status(404).json({ message: "Wishlist is empty or not found" });
        }

        res.status(200).json({ message: "Wishlist cleared successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error clearing wishlist", error: error.message });
    }
}
