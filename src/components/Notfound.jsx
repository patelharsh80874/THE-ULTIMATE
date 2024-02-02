
import React from 'react'
import notfound from '../../public/notfound.png'
import { Link, useNavigate } from 'react-router-dom'

const Notfound = () => {
  const Navigate = useNavigate()
  return (
    <div className='absolute top-0 bg-[rgba(0,0,0,0.9)] text-white w-screen h-screen flex items-center justify-center'>
       <Link
          onClick={() => Navigate(-1)}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
        ></Link>
        <img className='scale-150' src={notfound} alt="" />
    </div>
  )
}

export default Notfound