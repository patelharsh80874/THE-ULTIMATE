import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Topnav } from "./templates/Topnav";
import { Cards } from "./templates/Cards";
import { Dropdown } from "./templates/Dropdown";

export const Movie = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "THE ULTIMATE | Movies " + category.toUpperCase();

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?page=${page}`
      );

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const refershHandler = async () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);
  
  return movie.length > 0 ? (
    <div className=" w-screen h-screen bg-[#303030]">
      <div className=" px-5 w-full flex items-center bg-[#303030] ">
        <i
          onClick={() => navigate(`/`)}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl sm:text-xl font-semibold leading-none text-zinc-300">
          Movie <br /><small className="text-zinc-500">({category})</small>
        </h1>
         
        <Topnav />

        <div className="sm:hidden flex gap-5">
          <Dropdown
            title="Category"
            options={["popular", "top_rated","now_playing","upcoming"]}
            func={(e) => setcategory(e.target.value)}
          />
        
        </div>
      </div>
      <div className="hidden sm:block sm:flex sm:justify-center sm:mt-3 sm:mb-3">
          <Dropdown
            title="Category"
            options={["popular", "top_rated","now_playing","upcoming"]}
            func={(e) => setcategory(e.target.value)}
          />
        
        </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};
