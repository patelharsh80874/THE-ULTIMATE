import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "./store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";
import { Dropdown } from "./templates/Dropdown";

export const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [Category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="w-full overflow-x-hidden">
      <nav className="w-full h-[10vh]  text-zinc-100 flex  gap-7 items-center font-semibold px-5 text-1xl  ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
        ></Link>

        <Link to={`/`}>
          <i className="hover:text-yellow-300 duration-200 ri-home-4-line"></i>
        </Link>
      </nav>
      {/* part 2  */}
      <div className="w-full flex">
        {/* part 2 left  */}
        <div className="w-[25%] pl-[5%] pt-5 flex flex-col items-start text-zinc-300 ">
          <img
            className=" w-[70%] shadow-md rounded "
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="w-[70%] mt-5 " />
          {/* external links */}
          <div className="text-2xl ml-5 text-white flex gap-3">
            <Link
              target="_blank"
              to={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-yellow-300 duration-200 ri-earth-fill"></i>
            </Link>
            <Link
              target="_blank"
              to={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="hover:text-yellow-300 ri-facebook-circle-fill"></i>
            </Link>
            <Link
              target="_blank"
              to={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="hover:text-yellow-300 ri-instagram-fill"></i>
            </Link>
            <Link
              target="_blank"
              to={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="hover:text-yellow-300 ri-twitter-x-fill"></i>
            </Link>
          </div>
          <h1 className=" text-3xl font-black mt-3 mb-3  ">Person info</h1>
          <li className=" text-xl font-semibold   ">Known for </li>
          <h1 className=" text-xl mb-3 ml-7">
            {info.detail.known_for_department}
          </h1>

          <li className=" text-xl font-semibold  ">Gender</li>
          <h1 className=" text-xl mb-3 ml-7">
            {info.detail.gender == 2 ? "Male " : "Female"}
          </h1>

          <li className=" text-xl font-semibold  ">Birthday</li>
          <h1 className=" text-xl mb-3 ml-7">{info.detail.birthday}</h1>

          <li className=" text-xl font-semibold  ">Deathday</li>
          <h1 className=" text-xl mb-3 ml-7">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <li className=" text-xl font-semibold  ">Place Of Birth</li>
          <h1 className=" text-xl w-[80%] mb-3 ml-7">
            {info.detail.place_of_birth}
          </h1>

          {info.detail.also_known_as.join(" , ") && (
            <li className=" text-xl font-semibold ">Also Known As</li>
          )}
          <p className=" text-lg w-[80%] mb-3 ml-7 ">
            {info.detail.also_known_as.join(" , ")}
          </p>
        </div>
        {/* part 3 right information */}
        <div className="w-[75%] p-5 text-zinc-200 ">
          <h1 className=" text-5xl font-black mb-3 ">{info.detail.name}</h1>
          {info.detail.biography && (
            <h1 className=" text-2xl font-semibold  ">Biography</h1>
          )}
          <p className="text-sm mt-3">{info.detail.biography}</p>
          <h1 className=" text-lg font-semibold mt-5">Summary</h1>
          <div>
            <HorizontalCards data={info.combinedCredits.cast} />
          </div>
          <div className="w-full flex justify-between">
            <h1 className=" text-xl font-semibold  ">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className=" rounded-md p-3 list-disc text-zinc-300 w-full h-[50vh] border-2 border-zinc-700 mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(225,225,225,.3)]">
            {info[Category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white rounded-md mt-3 hover:bg-black duration-200 p-5 cursor-pointer"
              >
                <Link to={`/${Category}/details/${c.id}`}>
                  <span>
                    {c.original_title || c.name || c.title || c.original_name}{" "}
                    <br /> <small className="ml-6">{c.release_date}</small>
                  </span>
                  <span className="block mt-3 ml-6">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
