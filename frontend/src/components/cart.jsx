import React, { useState } from "react";
import { Link } from "react-router";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
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
      onClick={() => onRemove(item.id)}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-5"
    >
      Remove
    </button>
  </div>
);

const ShoppingCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Airpod",
      price: 10.99,
      image: "/images/airpods.jpeg",
      quantity: 1,
    },
    {
      id: 2,
      title: "Low top sneaker",
      price: 15.99,
      image: "/images/tendy3.jpg",
      quantity: 1,
    },
  ]);

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
