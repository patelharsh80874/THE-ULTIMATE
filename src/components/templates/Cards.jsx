import React from "react";
import { Link } from "react-router-dom";
import noimg from "/noimg.jpg";

export const Cards = ({ data, title }) => {
  return (
    <div className="w-full flex relative flex-wrap justify-center gap-3 mt-3 bg-[#303030]">
      {data.map((c, i) => (
        <Link
          to={`/${c.mmedia_type || title}/details/${c.id}`}
          className="w-[20%] sm:w-[40%] mb-5 relative "
          key={i}
        >
          <img
            className="w-[80%] shadow-md rounded m-auto "
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimg
            }
            alt=""
          />
          <h1 className="text-[2vw] sm:text-[3vw] w-[80%] m-auto text-center text-zinc-300 mt-3 font-semibold">
            {c.title || c.original_title || c.name  || c.original_name}
          </h1>
          {c.vote_average>0 && (
            <div className="sm:hidden absolute right-0 bottom-36 -translate-x-[20%] -translate-y-[50%] text-white text-[1.3vw] bg-yellow-500 w-[3vw] h-[3vw] flex items-center justify-center rounded-full">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};
