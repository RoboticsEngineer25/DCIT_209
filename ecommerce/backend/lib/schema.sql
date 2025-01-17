-- Users Table
CREATE TABLE Users (
                       user_id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) DEFAULT 'none',
                       phone_number VARCHAR(10) NOT NULL UNIQUE,
                       gender ENUM('male', 'female') NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Authentication Table
CREATE TABLE Authentication (
                                auth_id SERIAL PRIMARY KEY,
                                user_id INT NOT NULL,
                                reset_token VARCHAR(255),
                                otp_code VARCHAR(6),
                                otp_expiry TIMESTAMP,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Terms Agreement Table
CREATE TABLE Terms_Agreement (
                                 agreement_id SERIAL PRIMARY KEY,
                                 user_id INT NOT NULL,
                                 terms_agreed BOOLEAN DEFAULT FALSE,
                                 newsletter_agreed BOOLEAN DEFAULT FALSE,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE Categories (
                            category_id SERIAL PRIMARY KEY,
                            category_name VARCHAR(100) NOT NULL,
                            parent_category_id INT,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE Products (
                          product_id SERIAL PRIMARY KEY,
                          category_id INT NOT NULL,
                          product_name VARCHAR(255) NOT NULL,
                          price DECIMAL(10, 2) NOT NULL,
                          description TEXT,
                          stock_quantity INT DEFAULT 0,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Wishlist Table
CREATE TABLE Wishlist (
                          wishlist_id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL,
                          product_id INT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Actions Log Table
CREATE TABLE User_Actions_Log (
                                  log_id SERIAL PRIMARY KEY,
                                  user_id INT NOT NULL,
                                  action_type VARCHAR(50) NOT NULL,
                                  action_details TEXT,
                                  action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE Orders (
                        order_id SERIAL PRIMARY KEY,
                        user_id INT NOT NULL,
                        total_amount DECIMAL(10, 2) NOT NULL,
                        order_status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE Order_Items (
                             order_item_id SERIAL PRIMARY KEY,
                             order_id INT NOT NULL,
                             product_id INT NOT NULL,
                             quantity INT NOT NULL,
                             price DECIMAL(10, 2) NOT NULL
);
