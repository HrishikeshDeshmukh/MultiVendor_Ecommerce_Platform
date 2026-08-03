import React from 'react'
import Slider from './Slider'
import CategorySlider from './CategorySlider'


const UserDashboard = () => {
  return (
      <div
      className="w-full min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-slate-900 via-black to-gray-900 
      text-white font-sans flex-col gap-10"
    >
      <Slider />  
      <CategorySlider />   
    </div>
  )
}

export default UserDashboard
