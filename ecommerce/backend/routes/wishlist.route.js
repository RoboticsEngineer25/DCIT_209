import express from "express";
import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
    getWishlistWithProducts
} from "../controllers/wishlist.controllers.js";

const router = express.Router();

// Route to add a product to the wishlist
router.post("/", addToWishlist);

// Route to get all products in the user's 
router.get("/:userId", getWishlist);

// Route to remove a product from the wishlist
router.delete("/", removeFromWishlist);

// Route to clear all products from the user's wishlist
router.delete("/clear/:userId", clearWishlist);
router.get("/list/:userId",getWishlistWithProducts);
export default router;
