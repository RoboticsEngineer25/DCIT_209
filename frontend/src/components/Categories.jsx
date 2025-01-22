import React from "react";
import { Link } from "react-router";

const CategoryCard = ({ href, imageSrc, title, description }) => (
  <Link to={href} className="text-gray-600 hover:text-gray-900">
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden rounded-lg mb-4">
        <img
          src={imageSrc}
          alt={`categories:${title.toLowerCase()}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const CategoriesPage = () => {
  const categories = [
    {
      href: "/electronics",
      imageSrc: "/images/computer.jpeg",
      title: "Electronics",
      description: "Smartphones, laptops, and other gadgets",
    },
    {
      href: "/fashion",
      imageSrc: "/images/fashion.jpeg",
      title: "Fashion",
      description: "Clothing, shoes, and accessories",
    },
    {
      href: "/home",
      imageSrc: "/images/home.jpg",
      title: "Home & Living",
      description: "Furniture, decor, and kitchen items",
    },
    {
      href: "/gaming",
      imageSrc: "/images/games.jpg",
      title: "Gaming",
      description: "Video games and gaming accessories",
    },
    {
      href: "/groceries",
      imageSrc: "/images/groceries.jpg",
      title: "Groceries",
      description: "Food, beverages, and foodstuffs",
    },
    {
      href: "/sports",
      imageSrc: "/images/court.jpeg",
      title: "Sports",
      description: "Sportwear, sport tools , and accessories",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">Sphinx</span>
              <img
                src="/images/logo.jpg"
                alt="sphinx logo"
                className="w-5 h-5 ml-2"
              />
            </Link>

            <div className="flex-1 max-w-xl mx-8">
              <input
                type="search"
                placeholder="Search products, brands and categories"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="flex items-center space-x-6">
              {[
                { to: "/homepage", text: "Home" },
                { to: "/categories", text: "Categories" },
                { to: "/", text: "Account" },
                { to: "/wishlist", text: "Wishlist" },
                { to: "/cart", text: "Cart" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-center">
                  <span className="text-sm">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Sphinx. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoriesPage;
