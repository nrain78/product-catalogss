import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const AddProduct = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();

  // Form ke initial values set kar rahe hain
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  //  Har input field ke change ko handle kar rahe hain
  const handleChange = (e) => {
    setForm({
      ...form, // purani values rakho
      [e.target.name]: e.target.value, // sirf change wali value update karo
    });
  };

  //  Form submit hone par yeh function chalega
  const createProduct = async (e) => {
    e.preventDefault(); 


    try {
      const res = await fetch(`${backendUrl}/api/products`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), 
      });


      //  Agar response theek nahi aaya
      if (!res.ok) {
        const data = await res.json();

        //  Agar validation ka error hai to sirf zaroori message dikhayein
        if (data.message?.includes("validation failed")) {
          const cleanedMessage = data.message.split(":").pop().trim();
          toast.error(cleanedMessage); //  jaise: "Please enter product name"
        } else {
          toast.error(data.message || "Something went wrong");
        }

        return; // aage ka code na chale agar error hai
      }

      // ✅ Agar product sahi se create ho gaya
      const data = await res.json();
      toast.success("Product created successully")
      setTimeout(() => {
        navigate("/products");
      }, 1000);

      //  Form ko reset kar do
      setForm({
        name: "",
        quantity: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      toast.error("Create error:", error); //  Error console me dikhao
    }
  };

  return (
   <div className="min-h-[calc(100vh-56px)] pt-20 overflow-y-auto flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-900 to-black p-4">
  <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Product</h1>
    <form onSubmit={createProduct} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Enter product name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Enter product quantity"
        value={form.quantity}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        placeholder="Enter product price"
        value={form.price}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        placeholder="Enter product description"
        value={form.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <input
        type="text"
        name="category"
        placeholder="Enter product category"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ringblue-500"
      />
      <input
        type="url"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Product
      </button>
    </form>
  </div>
</div>

  );
};

export default AddProduct;
