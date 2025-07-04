import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-900 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-blue-400">MyStore</span>
        </h1>
        {/* <p className="text-lg text-gray-200">
          Discover, manage, and showcase your products with style. A smooth and dynamic way to handle inventory, view details, and keep your store organized.
        </p> */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="px-6 py-3 bg-slate-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            View Products
          </Link>
          <Link
            to="/add-product"
            className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-lg transition font-medium"
          >
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
