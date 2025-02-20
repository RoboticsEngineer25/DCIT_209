import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAddToWishlist from "../context/cart";

const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/sphinx/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Product = () => {
  const wishlist=useAddToWishlist();
  // Use the object syntax for useQuery in v5
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"], // Query key as an array
    queryFn: fetchProducts, // Query function
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                Cart (0)
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-2 gap-6">
          {data.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.productImageUrl || "images/default-product.jpg"}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.productName}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-2 inline-flex w-full justify-between flex-wrap items-center">
                  <span className="text-lg font-bold text-gray-900 flex-1">
                    ${product.price}
                  </span>
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={()=>wishlist.mutate({userId:localStorage.getItem("id"),productId:product.productId})}>
                    Add to Cart
                  </button>
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
