import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

function Admin() {
  const [categories, setCategories] = useState([]); // Categories array
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [id, setId] = useState(""); // Selected category ID
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    preview: null,
    sku: "",
    description: "",
    quantity: "",
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:5000/api/sphinx/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setCategories(data.data); // Set categories state directly to the array
      console.log("Categories fetched:", data.data);
    },
    onError: (error) => {
      console.error("Categories fetch error:", error.message);
    },
  });

  const mutation = useMutation({
    mutationFn: async (product) => {
      const response = await fetch(
        "http://localhost:5000/api/sphinx/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload product");
      }

      return response.json();
    },
    onError: (error) => {
      console.error("Product upload error:", error.message);
    },
    onSuccess: (data) => {
      console.log("Product upload successful:", data);
    },
  });
console.log(id)
  const saveCategory = useMutation({
    mutationFn: async (category) => {
      const response = await fetch(
        "http://localhost:5000/api/sphinx/categories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(category),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload category");
      }

      return response.json();
    },
    onError: (error) => {
      console.error("Category upload error:", error.message);
    },
    onSuccess: (data) => {
      setCategories((prev) => [...prev, data]); // Add new category to existing ones
      console.log("Category upload successful:", data);
    },
  });

  const handleAddCategory = () => {
    if (
      newCategory &&
      !categories.some((cat) => cat.categoryName === newCategory)
    ) {
      saveCategory.mutate({ categoryName: newCategory });
      setNewCategory("");
    }
  };

  const handleAddProduct = () => {
    if (
      productDetails.name &&
      productDetails.category &&
      productDetails.price &&
      productDetails.image
    ) {
      mutation.mutate({
        productName: productDetails.name,
        price: productDetails.price,
        productImageUrl: productDetails.image,
        sku: productDetails.sku,
        description: productDetails.description,
        stockQuantity: productDetails.quantity,
        categoryId: id, // Use the selected category ID here
      });

      // Clear product details after adding
      setProductDetails({
        name: "",
        category: "",
        price: "",
        image: null,
        preview: null,
        sku: "",
        description: "",
        quantity: "",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductDetails({
          ...productDetails,
          image: reader.result, // Base64 string
          preview: URL.createObjectURL(file), // Local preview
        });
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="app-container">
      <h1>Admin Panel</h1>
      <div className="section">
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <div className="section">
        <h2>Add Product</h2>
        {productDetails.preview && (
          <img
            src={productDetails.preview}
            alt="Preview"
            className="preview-image"
          />
        )}
        <input
          type="text"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={(e) =>
            setProductDetails({ ...productDetails, name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={productDetails.description}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              description: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="SKU"
          value={productDetails.sku}
          onChange={(e) =>
            setProductDetails({
              ...productDetails,
              sku: e.target.value,
            })
          }
        />
        <select
          value={productDetails.category}
          onChange={(e) => {
            const selectedCategoryId = e.target.value; // Get the selected category ID
            setProductDetails({
              ...productDetails,
              category: selectedCategoryId,
            });
            setId(selectedCategoryId); // Set the state for 'id'
          }}
        >
          <option value="">Select Category</option>
          {data.data.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price"
          value={productDetails.price}
          onChange={(e) =>
            setProductDetails({ ...productDetails, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={productDetails.quantity}
          onChange={(e) =>
            setProductDetails({ ...productDetails, quantity: e.target.value })
          }
        />

        <input type="file" onChange={handleImageUpload} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="section">
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <strong>{product.name}</strong> - {product.category} - $
              {product.price}
              <br />
              {product.preview && (
                <img
                  src={product.preview}
                  alt={product.name}
                  className="preview-image"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
