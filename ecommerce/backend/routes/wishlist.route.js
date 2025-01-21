import express from "express";
import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist
} from "../controllers/wishlist.controllers.js";

const router = express.Router();

// Route to add a product to the wishlist
router.post("/wishlist", addToWishlist);

// Route to get all products in the user's wishlist
router.get("/wishlist/:userId", getWishlist);

// Route to remove a product from the wishlist
router.delete("/wishlist/:userId/:productId", removeFromWishlist);

// Route to clear all products from the user's wishlist
router.delete("/wishlist/clear/:userId", clearWishlist);

export default router;
