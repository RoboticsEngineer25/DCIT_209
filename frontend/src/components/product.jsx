import React from "react";
import { Link } from "react-router";

const Product= () => {
  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Best Selling Products
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/homepage"
                className="text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <a href="Cart.html" className="text-gray-600 hover:text-gray-900">
                Cart (0)
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <select className="border rounded-md px-3 py-2">
              <option>Filter by Brand</option>
              <option>Brand 1</option>
              <option>Brand 2</option>
            </select>
            <select className="border rounded-md px-3 py-2">
              <option>Price Range</option>
              <option>$0 - $100</option>
              <option>$101 - $500</option>
              <option>$501+</option>
            </select>
          </div>
          <select className="border rounded-md px-3 py-2">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              image: "images/airpods.jpeg",
              name: "Wireless Headphones",
              description: "Premium sound quality",
              price: "$10.99",
              hasWishlist: true,
            },
            {
              image: "images/watch.jpg",
              name: "Smart Watch",
              description: "Track your fitness",
              price: "$199.99",
            },
            {
              image: "images/speaker.jpg",
              name: "Wireless Speaker",
              description: "360° sound",
              price: "$149.99",
            },
            {
              image: "images/tendy3.jpg",
              name: "Low top sneaker",
              description: "Streamlines your legs for beauty",
              price: "$15.99",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                  {product.hasWishlist && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Add to Wishlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            <a
              href="#"
              className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="px-3 py-2 border rounded-md bg-blue-600 text-white"
            >
              1
            </a>
            <a
              href="#"
              className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              3
            </a>
            <a
              href="#"
              className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Next
            </a>
          </nav>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2025 Your Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Product;
