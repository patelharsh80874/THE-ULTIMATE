import axios from '../../utils/axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/logo2.jpg'

export const Sidenav = () => {


  return (
    <div className='w-[20%] min-h-[100vh] overflow-y-auto bg-[#5f727a] p-5'>
        <h1 className='font-bold flex flex-col items-center'>
        {/* <i className=" text-[#A2C579] ri-tv-fill text-2xl"></i> */}
        <img  width={130} className='rounded-full' src={logo} alt="" />
            <span className=' text-3xl text-center  font-thin'>THE ULTIMATE</span>
        </h1>
        <nav className='flex flex-col text-xl gap-2'>
            <h1 className=' mt-10 mb-5 font-semibold text-xl '>New Feeds</h1>
           <Link to="/trending" className='hover:bg-[#ffffdd] p-5 rounded duration-200'>
           <i className=" mr-2 text-[#A2C579] ri-fire-fill"></i>
           Trending
           </Link>
           <Link to="/popular" className='hover:bg-[#ffffdd] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-bard-fill"></i>
           Popular
           </Link>
           <Link to="/movie" className='hover:bg-[#ffffdd] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-movie-2-fill"></i>
           Movies
           </Link>
           <Link to="/tv" className='hover:bg-[#ffffdd] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-slideshow-3-fill"></i>
           Tv Shows
           </Link>
           <Link to="/person" className='hover:bg-[#ffffdd] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-team-fill"></i>
           People
           </Link>
        </nav>
    </div>
  )
}
