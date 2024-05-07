
import {FaSearch} from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

export default function Header() {
  const {currentUser} =useSelector((state)=>state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
   <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-blue-200' >Cozy</span>
            <span className='text-blue-400'>Corner</span>
        </h1>
        </Link>
        <form className='bg-slate-100 rounded-md p-2 flex items-center '>
            <input placeholder='Search..' className=' w-24 sm:w-64 focus:outline-none bg-transparent'/>
            <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4 items-center'>
            <Link to='/'> 
            <li className='text-slate-700 hidden sm:inline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='text-slate-700 hidden sm:inline'>About</li>
            </Link>
            <Link to='/profile'>
              {currentUser ? 
              (<img className="rounded-full h-8  w-8 object-cover" src={currentUser.avatar} alt="user"  />) : 
              (<li className='text-slate-700'>Sign In</li>)}
            </Link>
        </ul>
         </div>
    </header> 
  )
}
