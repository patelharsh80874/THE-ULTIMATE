import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Plyer = () => {
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  // const ytvideo = useSelector((state) => state[category].info.videos);
  const ytvideo = useSelector((state) => state[category].info.detail.id);

  // console.log(ytvideo);
  // console.log(pathname);
  // console.log(category);
  return ytvideo ? (
    <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.9)] text-white w-screen h-screen flex items-center justify-center">
      <Link
      to={`/${category === "movie" ? "movie" : "tv"}/details/${ytvideo}`}
        // onClick={() => Navigate(-1)}
        className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
      ></Link>
      {/* <ReactPlayer
        // width={1000}
        // height={500}
        // controls
        // url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        // url={`https://www.braflix.video/movie/${ytvideo}`}
        url={`https://embed.smashystream.com/playere.php?tmdb=${ytvideo}`}
      /> */}
     
      <iframe
      allowFullScreen
    //   sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
        className="w-[90vw] sm:h-[80vh] h-[80vh] "
        // src={`https://embed.smashystream.com/playere.php?tmdb=${ytvideo}`}
        src={category == "tv" ? `https://vidsrc.cc/v2/embed/tv/${ytvideo}`: `https://vidsrc.cc/v2/embed/movie/${ytvideo}`}
        // src={`https://vidsrc.to/embed/movie/${ytvideo}`}
      ></iframe>
      {/* <iframe
        className="w-[90vw] h-[80vh]"
        src={`https://www.braflix.video/movie/${ytvideo}`}
        frameborder="0"
      ></iframe> */}
    </div>
  ) : (
    <Notfound />
  );
};

export default Plyer;
