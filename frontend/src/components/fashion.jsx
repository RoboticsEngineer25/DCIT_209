import React from "react";

const products = [
  {
    id: 1,
    name: "Sportwear",
    description: "Walk with elegance",
    price: 20.0,
    image: "images/trendy1.jpg",
  },
  {
    id: 2,
    name: "Low top Sneaker",
    description: "Streamlines your legs for beauty\nBreathable",
    price: 15.99,
    image: "images/tendy3.jpg",
  },
  {
    id: 3,
    name: "Classy Top",
    description: "Wear in style\nMore storage compartments and easy movement",
    price: 10.99,
    image: "images/top1.webp",
  },
  {
    id: 4,
    name: "Cargo Jeans",
    description: "Ultimate confidence",
    price: 20.99,
    image: "images/top2.webp",
  },
];

const Fashion = () => {
  return (
    <div className="bg-gray-50">
      <header className="bg-green-500 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Fashion</h1>
            <div className="flex items-center space-x-4">
              <a
                href="Categories.html"
                className="text-gray-600 hover:text-gray-900"
              >
                Categories
              </a>
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
              <option>Sportwear</option>
              <option>Cargo jeans</option>
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
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-50 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Wishlist
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

      <footer className="bg-green-500 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2025 Sphinx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Fashion;
