"use client"

import React from 'react'
import { IUser } from '@/types/user'
import { useRouter } from 'next/navigation'

const Footer = ({ user }: { user: IUser }) => {

    const role = user?.role
    const isUser = role === "user"
    const isVendorOrAdmin = role === "vendor" || role === "admin"
    const router = useRouter()


    return (
        <>
            <div className="bg-gradient-to-br from-slate-900 via-black to-gray-900 text-white w-full py-12 z-40 px-6 border-t border-gray-700 grid gap-10 md:grid-cols-3 lg:grid-cols-3">
                <div className={`max-w-7xl mx-auto px-6 grid gap-10 md:text-left text-center
        ${isUser ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                    <div className="space-y-3">
                        <h2 className="text-white text-3xl font-bold cursor-pointer tracking-wide
                hover:text-blue-300" onClick={() => router.push("/")}>Vendora</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">Your one-stop solution for all your shopping needs. Enjoy a seamless shopping experience with Vendora.</p>
                    </div>
                    {isVendorOrAdmin && (
                        <span className={`inline-block mt-2 text-[11px] px-3 py-1 rounded-full text-white
                ${role === "admin" ? "bg-red-500" : "bg-blue-500"}`}>
                            {role === "admin" ? "Admin Panel" : "Vendor Panel"}
                        </span>
                    )}
                </div>
                <div className=" grid grid-cols-2 gap-10">
                    {isUser && (

                        <div>
                            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/")}>Home</li>
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/categories")}>Categories</li>
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/orders")}>Orders</li>
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/shops")}>Shops</li>
                            </ul>
                        </div>
                    )}

                    {isUser && (
                        <div>
                            <h3 className="text-white text-lg font-semibold">Help & Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/support")}>Support</li>
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/track")}>Track Order</li>
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/orders")}>Orders</li>
                                <li className="cursor-pointer hover:text-white" onClick={() => router.push("/shops")}>Shops</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-white text-lg font-semibold">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <p className="cursor-pointer hover:text-white" onClick={() => router.push("/")}>admin@vendora.com</p>
                        <p className="cursor-pointer hover:text-white" onClick={() => router.push("/track")}>+01 8788405018</p>
                        <p className="cursor-pointer hover:text-white" >Hinjewadi, Pune</p>
                    </ul>
                </div>



            </div>
            <div className=" w-full text-center text-xs text-gray-500 my-4  border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} Vendora. All rights reserved.
            </div>


        </>
    )
}

export default Footer
