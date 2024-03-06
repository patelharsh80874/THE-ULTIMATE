import React, { useEffect, useState } from "react";
import { Sidenav } from "./templates/Sidenav";
import { Topnav } from "./templates/Topnav";
import axios from "../utils/axios";
import { Header } from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./Loading";
import { Dropdown } from "./templates/Dropdown";
import Ads from "../../Ads";

export const Home = () => {
  document.title = "THE ULTIMATE | Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrendin] = useState(null);
  const [menuset, setmenuset] = useState(false)
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[Math.floor(Math.random() * data.results.length)];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("error", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrendin(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  function menuhendlaer() {
    setmenuset(!menuset)
    
  }

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
    
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav menuset={menuset} />
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden ">
        
        <Topnav menuhendlaer={menuhendlaer}  menuset={menuset} />
        <Header data={wallpaper} />

        <div className=" flex justify-between items-center p-3 ">
          <h1 className="text-2xl  font-semibold  text-zinc-300">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
        <Ads/>
      </div>
    </>
  ) : (
    <Loading />
  );
};
