-- Users table
CREATE TABLE Users
(
    user_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    first_name    VARCHAR(50)  NOT NULL,
    other_names   VARCHAR(50),
    date_of_birth DATE,
    country_code  VARCHAR(10),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Authentication table
CREATE TABLE Authentication
(
    auth_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    reset_token VARCHAR(255),
    otp_code    VARCHAR(6),
    otp_expiry  TIMESTAMP,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);

-- Terms Agreement table
CREATE TABLE Terms_Agreement
(
    agreement_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id           BIGINT NOT NULL,
    terms_agreed      BOOLEAN   DEFAULT FALSE,
    newsletter_agreed BOOLEAN   DEFAULT FALSE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE Categories
(
    category_id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name      VARCHAR(100) NOT NULL,
    parent_category_id BIGINT,
    created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES Categories (category_id) ON DELETE SET NULL
);

-- Products table
CREATE TABLE Products
(
    product_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id    BIGINT         NOT NULL,
    product_name   VARCHAR(255)   NOT NULL,
    price          DECIMAL(10, 2) NOT NULL,
    description    TEXT,
    stock_quantity INT       DEFAULT 0,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id) ON DELETE CASCADE
);

-- Wishlist table
CREATE TABLE Wishlist
(
    wishlist_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    product_id  BIGINT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products (product_id) ON DELETE CASCADE
);

-- User Actions Log table
CREATE TABLE User_Actions_Log
(
    log_id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT      NOT NULL,
    action_type      VARCHAR(50) NOT NULL,
    action_details   TEXT,
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE Orders
(
    order_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT         NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM ('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at   TIMESTAMP                                  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);

-- Order Items table
CREATE TABLE Order_Items
(
    order_item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id      BIGINT         NOT NULL,
    product_id    BIGINT         NOT NULL,
    quantity      INT            NOT NULL,
    price         DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders (order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products (product_id) ON DELETE CASCADE
);
