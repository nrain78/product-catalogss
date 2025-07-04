import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const UpdateProduct = () => {
  const { id } = useParams(); 
  
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

  //  Form ke initial values rakhi hain
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // 🟡 Jab component load ho to purana product fetch karo aur form fill karo
  useEffect(() => {
    fetch(`${backendUrl}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) toast.error("Product not found");;
        return res.json();
      })
      .then((data) => setForm(data))
      .catch((err) => toast.error("Fetch error:", err.message));
  }, [id]);


  // 🖊️ Har input ke change ko handle karna (form update)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Form submit hone par update wali API call kar rahe hain
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });


      // ❌ Agar koi error ho to user ko batayein
      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Update failed");
        return;
      }

      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      toast.error("Update error:", error);
    }
  };



  return (
   <div className="min-h-[calc(100vh-56px)] pt-14  overflow-y-auto flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black p-4">
  <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Product</h1>
    <form onSubmit={handleUpdate} className="space-y-4">
      <input
        name="name"
        value={form.name}
        placeholder="Enter product name"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="quantity"
        value={form.quantity}
        placeholder="Enter product quantity"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="price"
        value={form.price}
        placeholder="Enter product price"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        value={form.description}
        placeholder="Enter product description"
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        name="category"
        value={form.category}
        placeholder="Enter product category"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        name="image"
        value={form.image}
        placeholder="Image URL"
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition duration-300"
      >
        Update Product
      </button>
    </form>
  </div>
</div>

  );
};

export default UpdateProduct;
