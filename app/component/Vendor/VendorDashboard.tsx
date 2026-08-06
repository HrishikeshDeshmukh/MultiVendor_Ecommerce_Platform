"use client"

import React, { useState } from 'react'
import { MdDashboard,  MdInventory2, MdShoppingCart} from 'react-icons/md'
import { motion, AnimatePresence } from 'motion/react'
import Dashboard from './Dashboard'
import VendorProducts from './VendorProducts'
import VendorOrders from './VendorOrders'




const VendorDashboard = () => {
    

  const [activePage, setActivePage] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(false);

  // renderpage logic
  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "products": return <VendorProducts />;
      case "orders": return <VendorOrders />;
      default: return <Dashboard />;
    }
  };

  const menu = [
    { id: "dashboard", name: "Dashboard", icon: <MdDashboard /> },
    { id: "products", name: "Products", icon: <MdInventory2 /> },
    { id: "orders", name: "Orders", icon: <MdShoppingCart /> },
   
  ]
  return (
    <div
      className="w-full min-h-screen pt-20  flex
      bg-gradient-to-br from-slate-900 via-black to-gray-900 
      text-white"
    >
      {/* Mobile Tab Bar  */}
      <div className="lg:hidden fixed top-15 left-0 w-full bg-black px-6 py-3 flex
      justify-between items-center z-50 border-b border-gray-700">
        <h1 className="text-xl font-bold md:flex hidden">Vendor Panel</h1>
        {/* <button onClick={() => setOpenMenu(!openMenu)} className="text-2xl">
          <AiOutlineMenu />
        </button>
       */}
        {menu.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items center gap-3 p-3 rounded-lg transition-colors
            ${activePage === item.id ? "bg-gray-700" : "hover:bg-gray-700/50"}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="text-xl">{item.icon}</span>
          </button>
        ))}
      </div>

      {/* Sidebar for Large Screen */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block w-72 h-screen  bg-[#6a69693c] backdrop-blur-lg shadow-lg text-white
        border-gray-700 p-6 backdrop-blur-xl"
      >
        <h1 className="text-xl font-bold mb-6">Vendor Panel</h1>
        <div className="flex flex-col gap-4 pt-5">
          {menu.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors
              ${activePage === item.id ? "bg-gray-700" : "hover:bg-gray-700/50"}`}

              onClick={() => setActivePage(item.id)}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

      </motion.div>

      {/* Main Content Area */}
      <motion.div 
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 px-10 mt-16 lg:mt-0 lg:px-20">
        {renderPage()}
      </motion.div>
    </div >
  )
}
 
 

export default VendorDashboard
