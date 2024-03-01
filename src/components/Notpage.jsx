import React from "react";
import img from "../../public/404.jpg";
import { Link, Navigate } from "react-router-dom";
const Notpage = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-black text-white">
      <Link
        to={-1}
        // onClick={() => Navigate(-1)}
        className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
      ></Link>

      <h1 className="text-red-500 font-black">Page Not Found</h1>
      <p className="text-red-400 font-semibold">
        The page you are looking for does not exist. Please go back to the
        homepage or use the search bar to find what you are looking for.
      </p>
      <img className="rounded-lg" src={img} alt="" />
    </div>
  );
};

export default Notpage;
