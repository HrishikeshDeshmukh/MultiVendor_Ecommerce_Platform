"use client";

import React from "react";
import Image from "next/image";

import { useState, useEffect } from "react";

import electronics from "@/public/categories/electronics.jpg";
import mens from "@/public/categories/mens.jpg";
import veggies from "@/public/categories/veggies.jpg";
import fitness from "@/public/categories/fitness.jpg";
import books from "@/public/categories/Books.jpg";
import toys from "@/public/categories/toys.jpg";
import ladies from "@/public/categories/ladies.jpg";
import homeDecors from "@/public/categories/decor.jpg";


const CategorySlider = () => {
    const categories = [
        { name: "Electronics", image: electronics },
        { name: "Fashion", image: mens },
        { name: "Home & Kitchen", image: veggies },
        { name: "Sports", image: fitness },
        { name: "Books", image: books },
        { name: "Toys", image: toys },
        { name: "Beauty", image: ladies },
        { name: "Home Decors", image: homeDecors },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % (categories.length - 4));
        }, 5000);

        return () => clearInterval(interval);
    }, [categories.length]);


    return (
        <div
            className="w-full min-h-[30vh] flex flex-col items-center justify-center
      bg-blacktext-white font-sans gap-10"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Explore Our Categories
            </h2>
            <div className="w-full overflow-hidden py-4">
                <div
                    className="flex gap-6 transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(calc(-${currentSlide} * (20rem + 1.5rem)))`,
                    }}
                >
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className="relative shrink-0 w-80 h-40 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                            />

                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-black/30 py-2 text-center">
                                <span className="font-semibold text-2xl flex items-center justify-center h-full">
                                    {category.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         
        </div>
    );
};

            export default CategorySlider;