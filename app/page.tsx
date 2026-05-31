import { auth } from "@/auth"
import connectDb from "@/lib/connectDB"
import User from "./model/user.model"
import { redirect } from "next/navigation"
import EditRoleandPhone from "./component/EditRoleandPhone"

const Home = async () => {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect("/login")
  }
  const inComplete = !user.role || !!user.phone || !user.phone && user.role == "user"
  if(inComplete){
    return <EditRoleandPhone />
  }
  return (
    <div>
      
    </div>
  )
}

export default Home
