import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAddToWishlist from "../context/cart";
// Fetch products from the API
const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/sphinx/products/21"); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Gaming = () => {
  // Use React Query to fetch products
  const addToWishlist = useAddToWishlist();
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <header className="  py-4 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gaming</h1>
          <div className="flex items-center space-x-4">
            <a href="/categories" className="hover:underline">
              Categories
            </a>
            <a href="/cart" className="hover:underline">
              Cart (0)
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  product.productImageUrl || "https://via.placeholder.com/200"
                }
                alt={product.productName}
                className="w-full  object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.productName}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-2 grid gap-2 items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={()=>addToWishlist.mutate({userId:localStorage.getItem("id"),productId:product.productId})}>
                    Add to Cart
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-green-600 text-white mt-12 py-4 text-center">
        <p>&copy; 2025 Your Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Gaming;
