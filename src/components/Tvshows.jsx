import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Topnav } from "./templates/Topnav";
import { Cards } from "./templates/Cards";
import { Dropdown } from "./templates/Dropdown";

export const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "THE ULTIMATE | tv Shows " + category.toUpperCase();

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const refershHandler = async () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setpage(1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className=" w-screen h-screen bg-[#303030]">
      <div className=" px-5 w-full flex items-center bg-[#303030] ">
        <i
          onClick={() => navigate("/")}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
        ></i>
        <h1 className="text-2xl font-semibold text-zinc-300">
          tv <br /><small className="text-zinc-500">({category})</small>
        </h1>
        <Topnav />
        <div className=" sm:hidden flex gap-5">
          <Dropdown
            title="Category"
            options={["top_rated", "popular","on_the_air","airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>
      <div className="hidden sm:block sm:flex sm:justify-center sm:mb-3 sm:mt-3 ">
          <Dropdown
            title="Category"
            options={["top_rated", "popular","on_the_air","airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};
