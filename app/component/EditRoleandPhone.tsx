"use client"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin, GrNext } from "react-icons/gr";
import { IoStorefrontSharp } from "react-icons/io5";
import axios from "axios";

function EditRoleandPhone() {

  const [role, setRole] = useState("")
  const [phone, setPhone] = useState("")
  const roles = [
    { label: "User", icon: <FaRegUser size={30} />, value: "user" },
    { label: "Vendor", icon: <IoStorefrontSharp size={30} />, value: "vendor" },
    { label: "Admin", icon: <GrUserAdmin size={30} />, value: "admin" }
  ]

  const [adminExist, setAdminExist] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/admin/check-admin")
        setAdminExist(res.data.exists)
      }
      catch (error) {
        setAdminExist(false)
        console.log(error)
      }
    }
    checkAdmin()
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-slate-900 via-black to-gray-900 
      text-white p-6'>
      <AnimatePresence>
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
            Choose Your <span className="text-yellow-300">Role</span>
          </h1>

          <p className="text-blue-300 mb-6">
            Select your role and Enter your mobile number to continue.
          </p>

          <form action="" className="flex flex-col gap-8">

            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              maxLength={10}
              required
              className="bg-white/10 border border-white/30 rounded-lg p-4
              text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />

            <div className="grid grid-cols-3 gap-4 mb-6">

              {roles.map((rol) => {
                const isAdminBlocked = rol.value == "admin" && adminExist
                return(
                <motion.div
                  key={rol.value}
                  onClick={()=>{
                    if(isAdminBlocked){
                      alert("Admin already Exists. You cannot select Admin role.")
                      return;
                    }
                    setRole(rol.value)
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 bg-white/5 hover:bg-white/20 
                          cursor-pointer rounded-xl border border-white/30 
                          shadow-lg flex flex-col items-center gap-3 transition
                          ${role === rol.value ? "border-blue-500 bg-blue-500/40"
                            : "border-white/20 bg-white/10 hover:bg-white/20"
                          }
                          ${isAdminBlocked && "opacity-40 cursor-not-allowed"}`}
                >

                  <div className="text-3xl text-yellow-300">
                    {rol.icon}
                  </div>

                  <p className="font-medium">
                    {rol.label}
                  </p>

                </motion.div>
                )

})}

            </div>

          </form>


          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 mx-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium 
                      flex justify-center items-center cursor-pointer">
            Next <GrNext className="ml-2" />
          </motion.button>

        </motion.div>

      </AnimatePresence >
    </div>


  )
}

export default EditRoleandPhone
