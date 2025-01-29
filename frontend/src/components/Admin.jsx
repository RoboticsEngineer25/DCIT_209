import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

function Admin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
    preview: null,
  });
  const [id, setId] = useState("");
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
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
    onSuccess: (data) => {
      setCategories(data.data);
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
      if (!response.ok) throw new Error("Failed to upload product");
      return response.json();
    },
    onError: (error) => console.error("Product upload error:", error.message),
    onSuccess: (data) => {
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
    },
  });

  const saveCategory = useMutation({
    mutationFn: async (category) => {
      const response = await fetch(
        "http://localhost:5000/api/sphinx/categories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            categoryName: category.name,
            categoryImage: category.image,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to upload category");
      return response.json();
    },
    onError: (error) => console.error("Category upload error:", error.message),
    onSuccess: (data) => {
      setCategories((prev) => [...prev, data]);
      setNewCategory({ name: "", image: null, preview: null });
    },
  });

  const handleAddCategory = () => {
    if (
      newCategory.name &&
      !categories.some((cat) => cat.categoryName === newCategory.name)
    ) {
      saveCategory.mutate({
        name: newCategory.name,
        image: newCategory.image?.split(",")[1] || null, // Remove base64 prefix
      });
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
        productImage: productDetails.image?.split(",")[1] || null, // Remove base64 prefix
        sku: productDetails.sku,
        description: productDetails.description,
        stockQuantity: productDetails.quantity,
        categoryId: id,
      });
    }
  };

  const handleCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCategory({
          ...newCategory,
          image: reader.result,
          preview: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
      console.log(file)
    }
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductDetails({
          ...productDetails,
          image: reader.result,
          preview: URL.createObjectURL(file),
        });

      };
      const d=reader.readAsDataURL(file);
      console.log(d)
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading categories...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error.message}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

        {/* Add Category Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add Category
          </h2>

          {/* Category Image Preview */}
          {newCategory.preview && (
            <div className="mb-4">
              <img
                src={newCategory.preview}
                alt="Category Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />

            <input
              type="file"
              onChange={handleCategoryImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <button
            onClick={handleAddCategory}
            className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Category
          </button>
        </div>

        {/* Rest of the component remains the same */}
        {/* Add Product Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add Product
          </h2>

          {productDetails.preview && (
            <div className="mb-4">
              <img
                src={productDetails.preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Product Name"
              value={productDetails.name}
              onChange={(e) =>
                setProductDetails({ ...productDetails, name: e.target.value })
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />

            <input
              type="text"
              placeholder="SKU"
              value={productDetails.sku}
              onChange={(e) =>
                setProductDetails({ ...productDetails, sku: e.target.value })
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />

            <select
              value={productDetails.category}
              onChange={(e) => {
                const selectedCategoryId = e.target.value;
                setProductDetails({
                  ...productDetails,
                  category: selectedCategoryId,
                });
                setId(selectedCategoryId);
              }}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
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
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />

            <input
              type="number"
              placeholder="Stock Quantity"
              value={productDetails.quantity}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  quantity: e.target.value,
                })
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            />

            <textarea
              placeholder="Description"
              value={productDetails.description}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  description: e.target.value,
                })
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 sm:col-span-2"
              rows="3"
            />

            <div className="sm:col-span-2">
              <input
                type="file"
                onChange={handleProductImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddProduct}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div key={index} className="border rounded-lg p-4">
                {product.preview && (
                  <img
                    src={product.preview}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-indigo-600 font-medium">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
