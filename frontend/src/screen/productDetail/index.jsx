import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [showProduct, setShowProduct] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          toast.error("Product not found");
          throw new Error("Not Found");
        }
        return res.json();
      })
      .then((data) => setShowProduct(data))
      .catch((err) => toast.error("Fetch error: " + err.message));
  }, [id]);

  if (!showProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <p className="text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-400 to-blue-400
     p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-3xl flex flex-col md:flex-row">
        <img
          src={showProduct.image}
          alt={showProduct.name}
          className="w-full md:w-1/2 h-64 object-contain bg-gray-100"
        />
        <div className="p-6 flex flex-col justify-between space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{showProduct.name}</h1>
          <p className="text-gray-600 text-sm">{showProduct.description}</p>
          <p className="text-gray-800 font-medium">Price: ${showProduct.price}</p>
          <p className="text-gray-700 text-sm">Quantity: {showProduct.quantity}</p>
          <p className="text-gray-500 text-sm">Category: {showProduct.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
