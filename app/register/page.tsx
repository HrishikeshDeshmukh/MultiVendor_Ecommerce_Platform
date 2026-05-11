'use client'

import { useState } from "react"

function Register(){
  const [step, setStep] = useState<1| 2>(1)


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br 
    from-slate-900 via-black to-gray-900 text-white p-6">

      {/* for step1 UI */}
      <div></div>
      {/* for step2 UI */}
      <div></div>

      
    </div>
  )
}

export default Register
