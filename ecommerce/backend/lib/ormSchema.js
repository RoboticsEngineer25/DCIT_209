import { mysqlTable, serial, varchar, text, int,date, decimal, boolean, timestamp, mysqlEnum, longtext } from "drizzle-orm/mysql-core";

// Users Table
export const users = mysqlTable("Users", {
    userId: serial("user_id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 50 }).notNull(),
    lastName: varchar("last_name", { length: 50 }).default("none"),
    phoneNumber: varchar("phone_number", { length: 10 }).notNull().unique(),
    gender: mysqlEnum("gender", ["male", "female"]).notNull(),
    role: mysqlEnum("role", ["admin", "user"]).default("user"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at", { mode: "string" }).default(null),
});

// Authentication Table
export const authentication = mysqlTable("Authentication", {
    authId: serial("auth_id").primaryKey(),
    userId: int("user_id").notNull(),
    resetToken: varchar("reset_token", { length: 255 }),
    otpCode: varchar("otp_code", { length: 6 }),
    otpExpiry: timestamp("otp_expiry", { mode: "string" }),
    failedLoginAttempts: int("failed_login_attempts").default(0),
    lockoutUntil: timestamp("lockout_until", { mode: "string" }).default(null),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow(),
});


// Terms Agreement Table
export const termsAgreement = mysqlTable("Terms_Agreement", {
    agreementId: serial("agreement_id").primaryKey(),
    userId: int("user_id").notNull(),
    termsAgreed: boolean("terms_agreed").default(false),
    newsletterAgreed: boolean("newsletter_agreed").default(false),
    termsVersion: int("terms_version").default(1),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});


// Categories Table
export const categories = mysqlTable("Categories", {
    categoryId: serial("category_id").primaryKey(),
    categoryName: varchar("category_name", { length: 100 }).notNull(),
    parentCategoryId: int("parent_category_id").default(null),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});


// Products Table
export const products = mysqlTable("Products", {
    productId: serial("product_id").primaryKey(),
    categoryId: int("category_id").notNull(),
    productName: varchar("product_name", { length: 255 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    description: text("description"),
    stockQuantity: int("stock_quantity").default(0),
    sku: varchar("sku", { length: 100 }).unique(),
    productImageUrl: longtext("product_image_url"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().onUpdateNow(),
});


// Wishlist Table
export const wishlist = mysqlTable("Wishlist", {
    wishlistId: serial("wishlist_id").primaryKey(),
    userId: int("user_id").notNull(),
    productId: int("product_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});


// User Actions Log Table
export const userActionsLog = mysqlTable("User_Actions_Log", {
    logId: serial("log_id").primaryKey(),
    userId: int("user_id").notNull(),
    actionType: varchar("action_type", { length: 50 }).notNull(),
    actionDetails: text("action_details"),
    actionTimestamp: timestamp("action_timestamp", { mode: "string" }).defaultNow(),
    ipAddress: varchar("ip_address", { length: 45 }),
});


// Orders Table
export const orders = mysqlTable("Orders", {
    orderId: serial("order_id").primaryKey(),
    userId: int("user_id").notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    orderStatus: mysqlEnum("order_status", ["Pending", "Completed", "Cancelled"]).default("Pending"),
    shippingAddress: text("shipping_address"),
    paymentMethod: mysqlEnum("payment_method", ["Credit Card", "PayPal", "Bank Transfer"]).default("Credit Card"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});


// Order Items Table
export const orderItems = mysqlTable("Order_Items", {
    orderItemId: serial("order_item_id").primaryKey(),
    orderId: int("order_id").notNull(),
    productId: int("product_id").notNull(),
    quantity: int("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});
