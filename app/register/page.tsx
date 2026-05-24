'use client'

import { AnimatePresence, motion } from "motion/react"
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin, GrNext } from "react-icons/gr";
import { IoStorefrontSharp } from "react-icons/io5";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";


function Register() {

  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message ?? "Registration failed");
        return;
      }

      router.push("/login");
    } catch {
      alert("Registration error");
    } finally {
      setLoading(false);
    }
  }


  const accountTypes = [
    { label: "User", icon: <FaRegUser size={30} />, value: "user" },
    { label: "Vendor", icon: <IoStorefrontSharp size={30} />, value: "vendor" },
    { label: "Admin", icon: <GrUserAdmin size={30} />, value: "admin" }
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-slate-900 via-black to-gray-900 
      text-white p-6"
    >

      <AnimatePresence mode="wait">

        {/* Step 1 UI */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg text-center bg-white/10 
            backdrop-blur-md rounded-2xl shadow-2xl p-10 
            border border-white/20"
          >

            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-yellow-300">Vendora</span>
            </h1>

            <p className="text-blue-300 mb-6">
              Register with one of the following account types :
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">

              {accountTypes.map((item) => (

                <motion.div
                  key={item.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white/5 hover:bg-white/20 
                  cursor-pointer rounded-xl border border-white/30 
                  shadow-lg flex flex-col items-center gap-3 transition"
                >

                  <div className="text-3xl text-yellow-300">
                    {item.icon}
                  </div>

                  <p className="font-medium">
                    {item.label}
                  </p>

                </motion.div>

              ))}

            </div>

            <motion.button
              onClick={() => setStep(2)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 mx-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium 
              flex justify-center items-center cursor-pointer">
              Next <GrNext className="ml-2" />
            </motion.button>

          </motion.div>
        )}

        {/* Step 2 UI */}
        {step === 2 && (
          <motion.div
            className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl
                       shadow-2xl p-8 border border-white/20"
            initial={{opacity:0, y:40}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-40}}
            transition={{duration:0.5}}
            >
            <h1 className="text-2xl font-semibold text-center mb-6">
              Create Your <span className="text-yellow-300">Account</span>
            </h1>

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">


              {/* name  */}
              <input 
              type="text" 
              required
              placeholder="Full Name"
              className="bg-white/10 border border-white/20 rounded-lg p-3
              focus:outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setName(e.target.value)}
              value={name}/>

              {/* Email  */}
              <input 
              type="email" 
              required
              placeholder="Enter Email"
              className="bg-white/10 border border-white/20 rounded-lg p-3
              focus:outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}/>


              {/* Password  */}
              
              <input 
              type={showPassword ? "text" : "password"} 
              required
              placeholder="Password"
              className="relative bg-white/10 border border-white/20 rounded-lg p-3
              focus:outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}/>
              <button 
              type="button"
              onClick={()=> setShowPassword(!showPassword)}
              className="absolute right-12 top-61 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                  {showPassword  ? <PiEyeClosedBold /> : <PiEyeBold />}
              </button>

              <motion.button
              disabled={loading}
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 mx-auto px-34 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium 
              flex justify-center items-center cursor-pointer">
             { loading ? <ClipLoader size={20} color='white' /> : "Register Now" }
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
              <span className="font-medium">Continue with Google</span> 
            </motion.button>

            <p className="text-center texxt-sm mt-4 text-gray-400 cursor-pointer">
              Already have an Account{" "} 
              <span 
              onClick={()=>router.push("/login")}
              className="text-blue-400 hover:underline hover:text-blue-300 transition">
                Sign In
              </span>
            </p>
             
            </form>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  )
}

export default Register