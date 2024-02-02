import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
          data.poster_path || data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[70vh] bg-red-400 flex flex-col gap-3 justify-end items-start p-5"
    >
      <h1
        className="text-5xl text-white font-bold  {
        
      }"
      >
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className=" text-zinc-400 font-semibold">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-600"
        >
          more
        </Link>
      </p>
      <p className=" text-white">
        <i className=" text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Information Available"}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className=" px-4  py-3 rounded-md bg-[#ffffdd]"
      >
        Watch trailer
      </Link>
    </div>
  );
};
