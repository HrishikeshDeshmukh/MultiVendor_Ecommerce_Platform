"use client"
import { motion, AnimatePresence } from 'motion/react'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from "react-spinners";
import { signIn, useSession } from 'next-auth/react';


const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const session  = useSession() // not needed on login page currently
    console.log(session)


    console.log()

    const handleSignIn = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect:false

            })
            alert("SignIn Successfully")
            router.push("/")
            setLoading(false)

        } catch (error) {

            console.log(error)
            setLoading(false)
            alert(error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
            <AnimatePresence>
                <motion.div
                    className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl
                       shadow-2xl p-8 border border-white/20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-semibold text-center mb-6">
                        Welcome Back to <span className="text-yellow-300">Vendora</span>
                    </h1>

                    <form onSubmit={handleSignIn} className="flex flex-col gap-4">


                        {/* Email  */}
                        <input
                            type="email"
                            required
                            placeholder="Enter Email"
                            className="bg-white/10 border border-white/20 rounded-lg p-3
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />


                        {/* Password  */}

                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Password"
                            className="relative bg-white/10 border border-white/20 rounded-lg p-3
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-12 top-45 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                            {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                        </button>

                        <motion.button
                            disabled={loading}
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4 mx-auto px-42 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium 
                            flex justify-center items-center cursor-pointer">
                            {loading ? <ClipLoader size={20} color='white' /> : "Login"}
                        </motion.button>

                        <div className="flex items-center my-3">
                            <div className="flex-1 h-px bg-gray-600"></div>
                            <span className="px-3 text-[18px] text-gray-400">or</span>
                            <div className="flex-1 h-px bg-gray-600"></div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex justify-center items-center gsp-3 py-3 bg-white/10 hover:bg-white/20
                            border border-white/30 rounded-xl transition cursor-pointer">
                            <FcGoogle className="mr-2 text-2xl" />
                            <span className="font-medium">Login with Google</span>
                        </motion.button>

                        <p className="text-center texxt-sm mt-4 text-gray-400 cursor-pointer">
                            Create New Account{" "}
                            <span
                                onClick={() => router.push("/register")}
                                className="text-blue-400 hover:underline hover:text-blue-300 transition">
                                Sign Up
                            </span>
                        </p>

                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default SignIn 
