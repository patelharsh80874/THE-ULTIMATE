import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimg from "/noimg.jpg";

export const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const Getserches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    Getserches();
  }, [query]);
  return (
    <>
      <div className="w-full h-[15vh] relative flex justify-start gap-10 items-center">
        <i className=" ml-[1vw] text-zinc-300 text-[2vw] ri-search-line"></i>
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          className="w-[30vw] p-3 text-[1.5vw] text-white outline-none border-none bg-transparent"
          type="search"
          id="search"
          placeholder="search anything"
        />
        <div className=" z-[99] ml-24 w-[35vw] max-h-[60vh] bg-slate-200 absolute top-[100%] overflow-auto">
          {searches ? (
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className=" font-semibold  flex justify-start items-center p-[1.5vw] w-full border-b-2 hover:bg-slate-400 duration-150 border-zinc-400"
              >
                <img
                  className="w-[8vw] mr-[2vw] rounded-[0.5vw] shadow-md"
                  src={
                    s.poster_path || s.backdrop_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          s.poster_path || s.backdrop_path || s.profile_path
                        }`
                      : noimg
                  }
                  alt=""
                />
                <span className=" text-[2vw]">
                  {s.original_title || s.name || s.title || s.original_name}{" "}
                  <br />
                  {s.release_date ? s.release_date : ""}
                </span>
              </Link>
            ))
          ) : (
            <h1>no results</h1>
          )}
        </div>
      </div>
    </>
  );
};
