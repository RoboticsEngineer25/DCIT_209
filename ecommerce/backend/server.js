import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import categoriesRoute from "./routes/categories.route.js";
import productRoute from "./routes/product.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded
({ extended:false}));
const port = process.env.PORT || 5000;
app.use("/api/auth",authRoutes)
app.use("/api/sphinx/categories",categoriesRoute)
app.use("/api/sphinx/products",productRoute)
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
})
