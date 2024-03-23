import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const PlyerThree = () => {
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  var series = pathname.split("/")[3];
  var season = pathname.split("/")[5];
  var episode = pathname.split("/")[7];
  // console.log(pathname);
  // console.log(series);
  // console.log(season);
  // console.log(episode);

  return (
    <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.9)] text-white w-screen h-screen flex items-center justify-center">
      <Link
        to={`/tv/details/${series}/season/${season}`}
        // onClick={() => Navigate(-1)}
        className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
      ></Link>

      <iframe
        // sandbox="allow-same-origin allow-scripts"
        allowFullScreen
        className="w-[90vw] sm:h-[80vh] h-[80vh] "
        src={`https://embed.smashystream.com/playere.php?tmdb=${series}&season=${season}&episode=${episode}`}
        //   src={`https://vidsrc.to/embed/movie/${ytvideo}`}
      ></iframe>
    </div>
  );
};

export default PlyerThree;
