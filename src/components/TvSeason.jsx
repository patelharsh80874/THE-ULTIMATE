import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Loading from "./Loading";
import noimg from "../../public/noimg.jpg";

const TvSeason = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  var series_id = pathname.split("/")[3];

  const [details, setdetails] = useState();
  const Getdetails = async () => {
    try {
      const { data } = await axios.get(`/tv/${series_id}/season/${id}`);
      setdetails(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    Getdetails();
  }, []);
    var series = (pathname.split("/")[3]);
  //   console.log(series_id);
  //   console.log(details);
  //   console.log(id);
  // console.log(series);
  return details ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${details?.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex flex-col gap-3 min-h-screen  relative overflow-x-hidden p-5"
    >
      <div className=" text-zinc-200 w-full flex items-center h-[40vh]">
        <div className="w-[15%] sm:w-[50%] h-full ">
          <img
            className="w-full h-full rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`}
            alt=""
          />
        </div>
        <div className="p-3">
          <div>
            <h1 className="text-2xl font-bold">{details.name}</h1>
            <h3 className="text-1xl font-semibold">
              Vote Average : {details.vote_average}
            </h3>
            <h3 className="text-1xl font-semibold">
              Date : {details.air_date}
            </h3>
            <h3 className="text-1xl font-semibold">
              Total Episodes : {details.episodes.length}
            </h3>
          </div>

          <div>
            <Link
              to={`/tv/details/${series}`}
            //   onClick={() => Navigate(-1)}
              className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-red-800 ri-close-fill absolute top-5 right-16"
            ></Link>
          </div>
        </div>
      </div>

      <div className=" text-white p-3 w-full h-[50vh] flex flex-shrink gap-3 overflow-x-auto overflow-hidden ">
        {details.episodes.map((d, i) => (
          <Link
            to={`${pathname}/episode/${d.episode_number}`}
            key={i}
            className=" p-2 w-[20%] sm:w-[60%] h-full sm:h-[70%] flex-shrink-0 bg-zinc-800 rounded-lg"
          >
            {d.still_path ? <img
              className="w-full h-[60%] sm:h-[60%] rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${d.still_path}`}
              alt=""
            />: <img
            className="w-full h-[60%] sm:h-[60%] rounded-lg"
            src={noimg}
            alt=""
          />  }
            
            <h3 className="font-semibold text-[1.3vw] sm:text-[4vw]">{d.name}</h3>
            <h4>Episode Number : {d.episode_number}</h4>
          </Link>
        ))}
      </div>
      <h1 className="text-red-400 font-semibold mt-2">Note : Connect <a className="text-blue-600" target="_blank" href="https://1.1.1.1/">DNS</a> , If Link Not Working. </h1>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvSeason;
