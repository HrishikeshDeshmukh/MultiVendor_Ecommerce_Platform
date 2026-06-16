import { auth } from "@/auth"
import connectDb from "@/lib/connectDB"
import User from "./model/user.model"
import { redirect } from "next/navigation"
import EditRoleandPhone from "./component/EditRoleandPhone"
import Navbar from "./component/Navbar"


async function Home(){
  await connectDb()
  const session = await auth()
const userDoc = await User.findById(session?.user?.id).lean();
const user = JSON.parse(JSON.stringify(userDoc));
  if(!user){
    redirect("/login")
  }
  const inComplete = !user.phone
  if(inComplete){
    return <EditRoleandPhone />
  }
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br
    from-gray-900 via-black to-gray-900 font-sans flex-col'>
      <Navbar  user={user} />
    </div>
  )
}

export default Home
