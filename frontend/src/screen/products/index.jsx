import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

  // Read Product
  useEffect(() => {
    fetch(`${backendUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Category ko unique banane ke liye Set ka use
        const categories = [...new Set(data.map((item) => item.category))];
        setUniqueCategory(["All", ...categories]);
      })
      .catch((error) => toast.error("Fetch Error :", error));
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        //  Delete ke baad UI se product hata rahe hain
        setProducts(products.filter((p) => p._id !== id));
      } else {
        toast.log("Failed to delete");
      }
    } catch (error) {
      toast.log("Error: ", error);
    }
  };

  // 🔹 Selected category ke basis par filtered product list bana rahe hain
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
<div className="min-h-screen pt-20 bg-gradient-to-br from-blue-900 via-blue-300 to-black p-4">
  <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
    <select 
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="bg-white/90 backdrop-blur-sm text-purple-800 border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
    >
      {uniqueCategory.map((item) => {
        return <option key={item}>{item}</option>;
      })}
    </select>

    <Link 
      to="/add-product" 
      className="bg-blue-700 w-full text-center sm:w-40 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition duration-300"
    >
      <button>Add Product</button>
    </Link>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProducts.map((item) => (
      <div 
        key={item._id} 
        className="bg-white backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-blue-200/30 hover:shadow-xl transition-shadow"
      >
        <div className="h-48 w-full flex items-center justify-center bg-gray-100/30 overflow-hidden">
          <img 
            src={item.image} 
            className="max-h-full max-w-full object-scale-down p-2" 
            alt={item.name}
          />
        </div>
        <div className="p-5">
          <h1 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h1>
          <p className="text-blue-900 mb-1">Price: {item.price}</p>
          <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
          <p className="text-gray-500 mb-4">Description: {item.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleDelete(item._id)}
              className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded flex-1 transition-colors text-sm"
            >
              Delete
            </button>
            <Link 
              to={`/update-product/${item._id}`}
              className="bg-blue-700 hover:bg-blue-300 text-white py-1 px-3 rounded flex-1 text-center transition-colors text-sm"
            >
              <button>Update</button>
            </Link>
            <Link 
              to={`/product-detail/${item._id}`}
              className="border bg-blue-600 text-white hover:bg-purple-50 py-1 px-3 rounded flex-1 text-center transition-colors text-sm"
            >
              <button>View</button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Products;
