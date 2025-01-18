import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import categoriesRoute from "./routes/categories.route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded
({ extended:false}));
const port = process.env.PORT || 5000;
app.use("/api/auth",authRoutes)
app.use("/api/sphinx",categoriesRoute)
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
})
