import React from 'react';
import {Link} from "react-router";

const HomePage = () => {
    const categoriesRaw = [
      {
        image: "images/shoes.jpg",
        alt: "categories:footwear",
        description: "Footwear",
      },
      {
        image: "images/fashion.jpeg",
        alt: "categories:fashion",
        description: "Fashion",
      },
      {
        image: "images/computer.jpeg",
        alt: "categories:computer",
        description: "computing",
      },
      {
        image: "images/court.jpeg",
        alt: "categories:sports",
        description: "Sports",
      },
      {
        image: "https://via.assets.so/Furniture.png?id=1&q=95&w=360&h=360&fit=fill",
        alt: "category:furniture",
        description: "furniture",
      },
    ];
    return (
      <div>
        <nav>
          <ul className="navbar">
            <li>
              <a href="index.html">
                <span style={{ fontSize: "20px" }}>Sphinx </span>
                <img
                  src="images/logo.jpg"
                  alt="sphinx logo"
                  className="logo"
                  style={{ width: "20px" }}
                />
              </a>
            </li>
            <li className="search" style={{ paddingTop: "20px" }}>
              <input
                type="search"
                id="search"
                placeholder="Search products, brands and categories"
              />
            </li>
            <li className="right">
              <a>Home</a>
            </li>
            <li className="right dropdown">
              <a>Categories</a>
            </li>
            <li className="right">
              <Link to="/">Account</Link>
            </li>
            <li className="right">
              <a>Wishlist</a>
            </li>
          </ul>
        </nav>

        <div>
          <h1>
            Shop By Category
            <span style={{ fontSize: "15px" }}>
              <a href="#">see more</a>
            </span>
          </h1>
        </div>

        <div>
          {categoriesRaw.map((category) => (
            <div className="gallery">
              <img src={category.image} alt={category.alt} />

              <div className="desc">{category.description}</div>
            </div>
          ))}
        </div>

        <div className="sale">
          <a href="#">
            <img src="images/sale2.jpg" alt="sale" className="sale" />
          </a>
        </div>

        <div>
          <h1>
            Best Selling Products
            <span style={{ fontSize: "15px" }}>
              <a href="#">see more</a>
            </span>
          </h1>
        </div>

        <div>
          <div className="gallery">
            <img
              src="images/af1.jpeg"
              alt="airforce one"
            />
            <div className="desc">Airforce 1 '07 'Triple White'</div>
          </div>
          <div className="gallery">
            <a href="#">
              <img src="images/airpods.jpeg" alt="airpods pro" />
            </a>
            <div className="desc">3rd Gen Airpod Pro</div>
          </div>
          <div className="gallery">
            <a href="#">
              <img src="images/fridge.jpeg" alt="french door fridge" />
            </a>
            <div className="desc">
              Westinghouse Stainless Steel Quad Door Fridge
            </div>
          </div>
          <div className="gallery">
            <a href="#">
              <img src="images/camera.jpeg" alt="digital camera" />
            </a>
            <div className="desc">Tagital Camera Camrecorder</div>
          </div>
        </div>

        <div className="sale">
          <a href="#">
            <img src="images/sale1.jpg" alt="sale" className="sale" />
          </a>
        </div>
      </div>
    );
};

export default HomePage;
