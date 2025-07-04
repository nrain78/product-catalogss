import React, { useState } from "react"
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom'


const Navbar = () => {
  const [toggle,setToggle] = useState(false);
  return(
    <>
     <header className="fixed top-0 left-0 w-full z-40  shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white"><Link to="/">MyStore</Link></div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li className="hover:texblue-400 transition"><Link to="/">Home</Link></li>
          <li className="hover:text-blue-400 transition"><Link to="/products">Products</Link></li>
          <li className="hover:text-blue-400 transition"><Link to="/add-product">Create Form</Link></li>
          
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden text-2xl z-50 text-
        white">
          {toggle ? (
            <IoMdClose onClick={() => setToggle(false)} className="cursor-pointer" />
          ) : (
            <FaBars onClick={() => setToggle(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <ul
        className={`fixed top-0 right-0 w-[70%] h-screen bg-white shadow-lg flex flex-col items-center justify-center gap-10 text-lg font-medium text-gray-700 transition-all duration-300 ease-in-out md:hidden ${
          toggle ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <li onClick={() => setToggle(false)} className="hover:text-purple-700 transition"><Link to="/">Home</Link></li>
        <li onClick={() => setToggle(false)} className="hover:text-purple-700 transition"><Link to="/products">Products</Link></li>
        <li onClick={() => setToggle(false)} className="hover:text-purple-700 transition"><Link to="/add-product">Create Form</Link></li>
        <li onClick={() => setToggle(false)} className="hover:text-purple-700 transition"><Link to="/auth/login">Login</Link></li>
      </ul>
    </header>
    </>
  )
}

export default Navbar;