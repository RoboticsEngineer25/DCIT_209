import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

// Fetch products from the API
const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/sphinx/products"); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      src={product.productImageUrl || "/images/default-product.jpg"} // Fallback image if productImageUrl is null
      alt={product.productName}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900">
        {product.productName}
      </h2>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <div className="mt-2 flex items-center w-full ">
        <span className="text-lg font-bold text-gray-900">
          ${product.price}
        </span>
        <button className="bg-blue-600 text-white m-2 p-1 flex-1 rounded-md hover:bg-blue-700">
          Add to Cart
        </button>
        {/* Add to Wishlist button (optional) */}
        {product.hasWishlist && (
          <button className="bg-blue-600 text-white flex-1 rounded-md hover:bg-blue-700">
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  </div>
);

const Electronics = () => {
  // Use React Query to fetch products
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"], // Query key
    queryFn: fetchProducts, // Query function
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-green-600 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Electronics</h1>
            <div className="flex items-center space-x-4">
              <Link to="/categories" className="text-white hover:text-gray-200">
                Categories
              </Link>
              <Link to="/cart" className="text-white hover:text-gray-200">
                Cart (0)
              </Link>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            <button className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border rounded-md bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </main>

      <footer className="bg-green-600 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2025 Sphinx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Electronics;
