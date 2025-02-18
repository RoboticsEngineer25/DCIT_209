import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useRemoveToWishlist from "../context/removefromcart.js";
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const removeFromWishlist=useRemoveToWishlist();
  return(
  <div className="flex items-center p-5 border-b border-gray-200">
    <img
      src={item.image}
      alt={item.title}
      className="w-24 h-24 object-cover mr-5"
    />
    <div className="flex-grow">
      <div className="text-lg font-bold mb-1">{item.title}</div>
      <div className="text-gray-600 mb-2">${item.price.toFixed(2)}</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          className="w-12 px-2 py-1 text-center border rounded"
          min="1"
        />
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
    <button
      onClick={() =>{ onRemove(item.id)
        removeFromWishlist.mutate({userId:localStorage.getItem("id")
      ,productId:item.id})}}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-5"
    >
      Remove
    </button>
  </div>
)};

const ShoppingCart = () => {
  // Fetch wishlist data using react-query
  const {
    data: wishlistData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await fetch(
       ` http://localhost:5000/api/sphinx/wishlist/list/2`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist data");
      }
      return response.json();
    },
  });

  // Initialize items state with wishlistData
  const [items, setItems] = useState([]);

  // Update items state when wishlistData is fetched
  useEffect(() => {
    if (wishlistData) {
      setItems(
        wishlistData.map((item) => ({
          id: item.productId,
          title: item.productName,
          price: parseFloat(item.price),
          image: item.productImageUrl,
          quantity: 1, // Default quantity
        }))
      );
    }
  }, [wishlistData]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.24;
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-5 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Shopping Cart
      </h1>

      <div className="mb-8">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-300">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Link to="/checkout">
          <button className="w-full mt-5 py-4 bg-green-600 text-white rounded hover:bg-green-700 text-lg">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
