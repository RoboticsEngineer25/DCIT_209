import React from "react";
import { Link } from "react-router";

const GalleryItem = ({ href, imageSrc, alt, description }) => (
  <div className="w-full sm:w-1/2 md:w-1/4 p-2">
    <Link to={href} className="block">
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-2 text-center">{description}</div>
    </Link>
  </div>
);

const Index= () => {
  const categories = [
    {
      href: "/footwear",
      imageSrc: "/images/shoes.jpg",
      alt: "categories:footwear",
      description: "Footwear",
    },
    {
      href: "/fashion",
      imageSrc: "/images/fashion.jpeg",
      alt: "categories:fashion",
      description: "Fashion",
    },
    {
      href: "/computing",
      imageSrc: "/images/computer.jpeg",
      alt: "categories:computing",
      description: "Computing",
    },
    {
      href: "/sports",
      imageSrc: "/images/court.jpeg",
      alt: "categories:sports",
      description: "Sports",
    },
  ];

  const bestSellers = [
    {
      href: "/products/airforce1",
      imageSrc: "/images/af1.jpeg",
      alt: "airforce one",
      description: "Airforce 1 '07 'Triple White'",
    },
    {
      href: "/products/airpods",
      imageSrc: "/images/airpods.jpeg",
      alt: "airpods pro",
      description: "3rd Gen Airpod Pro",
    },
    {
      href: "/products/fridge",
      imageSrc: "/images/fridge.jpeg",
      alt: "french door fridge",
      description: "Westinghouse Stainless Steel Quad Door Fridge",
    },
    {
      href: "/products/camera",
      imageSrc: "/images/camera.jpeg",
      alt: "digital camera",
      description: "Tagital Camera Camrecorder",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <ul className="flex items-center justify-between max-w-7xl mx-auto px-4 h-16">
          <li>
            <Link to="/" className="flex items-center">
              <span className="text-xl">Sphinx</span>
              <img
                src="/images/logo.jpg"
                alt="sphinx logo"
                className="w-5 ml-2"
              />
            </Link>
          </li>
          <div>

          </div>
          {[
            { to: "/homepage", text: "Home" },
            { to: "/categories", text: "Categories" },
            { to: "/account", text: "Account" },
            { to: "/cart", text: "Cart" },
          ].map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="text-center px-4">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shop By Category</h1>
          <Link to="/categories" className="text-sm">
            see more
          </Link>
        </div>

        <div className="flex flex-wrap -mx-2">
          {categories.map((item) => (
            <GalleryItem key={item.href} {...item} />
          ))}
        </div>

        <Link to="/sale" className="block my-8">
          <img src="/images/sale2.jpg" alt="sale" className="w-full" />
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Best Selling Products</h1>
          <Link to="/products" className="text-sm">
            see more
          </Link>
        </div>

        <div className="flex flex-wrap -mx-2">
          {bestSellers.map((item) => (
            <GalleryItem key={item.href} {...item} />
          ))}
        </div>

        <Link to="/sale" className="block my-8">
          <img src="/images/sale1.jpg" alt="sale" className="w-full" />
        </Link>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Sphinx . All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
