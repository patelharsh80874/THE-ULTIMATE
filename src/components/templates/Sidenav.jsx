import axios from '../../utils/axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/logo2.jpg'

export const Sidenav = ({menuset}) => {
      

  return (
    <div className={`sidenav duration-300 w-[20%] sm:overflow-y-auto sm:z-50 sm:w-[50%] sm:absolute ${menuset ? "sm:left-0" : "sm:left-[-100%]"}  h-[100vh] overflow-y-auto bg-[#5f727a]  p-5`}>
        <h1 className='font-bold  mt-5 items-center'>
        {/* <i className=" text-[#A2C579] ri-tv-fill text-2xl"></i> */}
        <img  width={150}  className='rounded-full mr-3' src={logo} alt="" />
            <span className=' text-[2vw] sm:text-[6vw] text-center  font-thin'>THE ULTIMATE</span>
        </h1>
        <nav className='flex flex-col text-xl gap-2'>
            <h1 className=' mt-10 mb-5 font-semibold text-xl '>New Feeds</h1>
           <Link to="/trending" className='hover:bg-[#ffffdd] text-[2vw] sm:text-[4vw] p-5 rounded duration-200'>
           <i className=" mr-2 text-[#A2C579] ri-fire-fill"></i>
           Trending
           </Link>
           <Link to="/popular" className='hover:bg-[#ffffdd] text-[2vw] sm:text-[4vw] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-bard-fill"></i>
           Popular
           </Link>
           <Link to="/movie" className='hover:bg-[#ffffdd] text-[2vw] sm:text-[4vw] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-movie-2-fill"></i>
           Movies
           </Link>
           <Link to="/tv" className='hover:bg-[#ffffdd] text-[2vw] sm:text-[4vw] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-slideshow-3-fill"></i>
           Tv Shows
           </Link>
           <Link to="/person" className='hover:bg-[#ffffdd] text-[2vw] sm:text-[4vw] p-5 rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-team-fill"></i>
           People
           </Link>
           <Link to="/MovieProvider" className='hover:bg-[#ffffdd] text-[2vw] sm:text-[4vw] p-5 flex items-center rounded duration-200'>
           <i className="mr-2 text-[#A2C579] ri-clapperboard-fill"></i>
           Movies/<br /> TvShows Providers
           </Link>
        </nav>
        <div className="flex gap-3 text-sm  ">
          <h1>MADE BY ❤️ HARSH PATEL</h1>
          <a
            target="_blank"
            href="https://www.instagram.com/harsh_patel_80874/"
          >
            <i className=" ri-instagram-fill"></i>
          </a>
        </div>
    </div>
  )
}
