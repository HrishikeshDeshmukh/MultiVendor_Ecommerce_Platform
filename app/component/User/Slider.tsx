"use client"

import { AnimatePresence, motion } from 'motion/react'
import slide1 from "@/public/slide1.jpg"
import slide2 from "@/public/slide2.jpg"
import slide3 from "@/public/slide4.png"
import { useState, useEffect } from 'react'
import Image from 'next/image'

function Slider() {
    const slides = [
        { image: slide1, title: "Style & Comfort", description: "Women's Fashion Collection", button: "DISCOVER" },
        { image: slide3, title: "Trendy Designs", description: "Men's Casual Wear", button: "SHOP NOW" },
        { image: slide2, title: "Elegant Styles", description: "Accessories & Footwear", button: "EXPLORE" }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className='relative w-full min-h-[90vh] mt-0 overflow-hidden bg-black
    text-white md:mt-15 pt-0 top-0 rounded-2xl'>
            < AnimatePresence>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex justify-center items-center">

                    <Image src={slides[currentSlide].image} alt={`Slide ${currentSlide + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col items-start justify-center px-10 
            md:px-24 bg-gradient-to-r from-black/70 to-transparent">
                        <motion.h3 className='text-sm md:text-base uppercase tracking-widest text-gray-300'
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2}} >
                                {slides[currentSlide].title}
                            </motion.h3>

                             <motion.h1 className='text-2xl md:text-4xl font-bold'
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }} >
                                {slides[currentSlide].description}
                            </motion.h1>

                             {/* <motion.p className='text-lg md:text-base uppercase text-gray-300 mb-6'
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }} >
                                {slides[currentSlide].button}
                            </motion.p> */}

                            <motion.button className='px-6 py-2 mt-6 bg-white text-black font-semibold rounded-lg shadow-lg transition hover:bg-gray-400'
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 0.8 }} >
                                {slides[currentSlide].button}
                            </motion.button>
            </div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-6 right-6 flex gap-4">
                {slides.map((slide, index) => (
                    <motion.div
                    key={index} 
                    whileHover={{ scale: 1.1 }}
                    onClick={()=>setCurrentSlide(index)}
                    className={`relative w-20 h-12 cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                        ${index === currentSlide ? "border-gray-100 shadow-[0_0_10px_rgba(59, 130, 246, 0.5)]" : "border-gray-600 hover:border-blue-400"} `}>

                        <Image src={slide.image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        {index === currentSlide && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-4 h-4 bg-white rounded-full"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Slider
