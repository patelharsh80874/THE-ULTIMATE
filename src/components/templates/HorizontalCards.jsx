import React from "react";
import { Link } from "react-router-dom";
import noimg from "/noimg.jpg";

function HorizontalCards({ data }) {
  return (
    <div className=" w-full h-[100vh] sm:h-[40vh]  flex gap-5 overflow-x-auto mb-5 p-5 ">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type === "movie" ? "movie" : "tv"}/details/${d.id}`}
            key={i}
            className="min-w-[25%] sm:min-w-[50%]   mb-3  flex flex-col gap-3 text-xl font-semibold bg-zinc-900 rounded"
          >
            <img
              className=" w-full h-[70%] rounded object-fill "
              src={
                d.poster_path || d.backdrop_path || d.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.poster_path || d.backdrop_path || d.profile_path
                    }`
                  : noimg
              }
              alt=""
            />
            <div className="w-full h-[30%] overflow-hidden">
              <h1 className="text-white text-[1.5vw] sm:leading-none sm:text-[4vw] pl-3">
                {d.original_title || d.title || d.name || d.original_name}
              </h1>
              <p className=" text-zinc-400 text-[1vw] sm:text-[2vw] leading-none pl-3 mt-[10px]">
                {d.overview.slice(0, 70)}...
                <span className="text-blue-600">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center mt-5">
          Noting to Show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
