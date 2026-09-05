"use client"

import { AnimatePresence, motion } from 'motion/react'
import { AiOutlineShop } from 'react-icons/ai'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'

const EditVendorDetails = () => {
    const [shopName, setShopName] = useState('')
    const [shopAddress, setShopAddress] = useState('')
    const [gstNumber, setGstNumber] = useState('')
    const [loading, setLoading] = useState(false) 
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!shopName || !shopAddress || !gstNumber) {
            alert("Please fill all the fields")
            return
        }
        setLoading(true)

        try {
            const result = await axios.post('/api/vendor/editDetails', { shopName, shopAddress, gstNumber })
            if (result.status === 200) {
                alert("Details updated successfully")
                window.location.reload()
                router.push('/')
            } else {
                alert(result.data.message || "Something went wrong")
            }
        } catch (error) {
            alert("An error occurred while updating details")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900
         via-black to-gray-900 text-white p-6'>
            <AnimatePresence>
                <motion.div className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8
                     border border-white/10'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}>

                    <h3 className='text-3xl font-semibold text-center mb-4'>
                        Complete Your Shop Details
                    </h3>

                    <p className="text-center text-gray-300 mb-6 text-sm">
                        Enter your business information to activate your vendor account.
                    </p>

                    <form className="flex flex-col gap-6"
                        onSubmit={handleSubmit}>
                        <div clasaName="relative">
                            <AiOutlineShop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                            <label htmlFor="shopName" className="block text-sm font-medium text-gray-300">
                                Shop Name
                            </label>
                            <input
                                type="text"
                                id="shopName"
                                className="w-full bg-white/10 border border-white/30 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 pl-10 text-white placeholder:text-gray-500"
                                placeholder="Enter your shop name"
                                required
                                onChange={(e) => setShopName(e.target.value)}
                                value={shopName}
                            />
                        </div>

                        <div>
                            <label htmlFor="shopAddress" className="block text-sm font-medium text-gray-300">
                                Shop Address
                            </label>
                            <input
                                type="text"
                                id="shopAddress"
                                className="w-full bg-white/10 border border-white/30 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 pl-10 text-white placeholder:text-gray-500"
                                placeholder="Enter your shop address"
                                required
                                onChange={(e) => setShopAddress(e.target.value)}
                                value={shopAddress}
                            />
                        </div>

                        <div>
                            <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-300">
                                GST Number
                            </label>
                            <input
                                type="text"
                                id="gstNumber"
                                className="w-full bg-white/10 border border-white/30 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 pl-10 text-white placeholder:text-gray-500"
                                placeholder="Enter your GST number"
                                required
                                onChange={(e) => setGstNumber(e.target.value)}
                                value={gstNumber}
                            />
                        </div>


                        <motion.button
                            disabled={loading}
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 mx-auto px-34 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium 
                            flex justify-center items-center cursor-pointer">
                            {loading ? <ClipLoader size={20} color='white' /> : "Submit Now"}
                        </motion.button>
                    </form>

                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default EditVendorDetails
