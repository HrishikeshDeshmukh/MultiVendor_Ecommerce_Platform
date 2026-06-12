import {User} from '@/model/user.model'

function Navbar({user}:{user:User}) {
  return (
    <div className ='fixed top-0 left-0 w-full bg-black text-white
    z-50 shadow-lg h-[80px]'>
      <div className ='max-w-7xl mx-auto px-6 py-3 flex justify-between items-center'>

      </div>
      
    </div>
  )
}

export default Navbar
