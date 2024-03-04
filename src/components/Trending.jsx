import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Topnav } from "./templates/Topnav";
import axios from "../utils/axios";
import { Cards } from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { Dropdown } from "./templates/Dropdown";

export const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "THE ULTIMATE | Trending " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const refershHandler = async () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" w-screen  h-screen  bg-[#303030]">
      <div className="relative px-5 sm:px-3 w-full flex   items-center bg-[#303030] ">
        <i
          onClick={() => navigate("/")}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl sm:text-2xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
        ></i>
        <h1 className=" text-[1.8vw] sm:text-[4vw] font-semibold text-zinc-300">
          Trending <br /> <small className="text-zinc-500">({category})</small>
        </h1> 
        {/* <div className="absolute left-[45%]"> */}
        <Topnav />
        {/* </div> */}
        
        <div className="sm:hidden flex gap-5">
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>

      </div>
      <div className="sm:block sm:flex sm:justify-center sm:gap-5 mt-3 mb-3  hidden">
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};
