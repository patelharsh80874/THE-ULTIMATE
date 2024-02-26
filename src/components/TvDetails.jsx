import React, { startTransition, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "./store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

export const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path ||
          info.detail.poster_path ||
          info.detail.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full relative overflow-x-hidden p-5"
    >
      {/* part 1 navigation */}
      <nav className="w-full h-[10vh] sm:h-[5vh] text-zinc-100 flex  gap-7 items-center font-semibold text-1xl  ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
        ></Link>
        <Link target="_blank" to={info.detail.homepage}>
          <i className="hover:text-yellow-300 duration-200 ri-external-link-fill"></i>
        </Link>
        <Link
          target="_blank"
          to={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-yellow-300 duration-200 ri-earth-fill"></i>
        </Link>
        <Link
          className="hover:text-yellow-300 duration-200"
          target="_blank"
          to={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </Link>
        <Link to={`/`}>
          <i className="hover:text-yellow-300 duration-200 ri-home-4-line"></i>
        </Link>
      </nav>
      {/* part 2 poster details */}
      <div className="w-full h-[70vh] sm:h-[50vh]  flex sm:block">
        <div className="w-[30%] sm:w-full h-full flex items-center justify-center">
          <img
            className=" w-[55%] sm:w-[60%] shadow-md rounded "
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
        </div>
        <div className="w-[70%] sm:hidden h-full text-white">
          <h1 className="text-4xl mb-2 font-black">
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.title ||
              info.detail.original_name}
            <small className="text-xl font-semibold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className="w-full h-[10%] flex gap-3 text-zinc-100 items-center">
            {info.detail.vote_average && (
              <div className=" text-white text-[1.3vw] bg-yellow-500 w-[3vw] h-[3vw] flex items-center justify-center rounded-full">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
            <h1 className="font-bold leading-none ">
              User <br /> Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g, i) => g.name).join(" , ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h3 className="text-xl mt-2 italic font-semibold">
            {info.detail.tagline}
          </h3>
          <h2 className="text-2xl  font-bold">overview</h2>
          <p className="text-sm leading-none mb-3">{info.detail.overview}</p>

          <h2 className="text-2xl font-bold">tv Translated</h2>
          <p className="text-sm leading-none mb-5">
            {info.translations.join(" , ")}
          </p>
          <Link
            className="px-5 py-4 inline-block bg-[#ffffdd] rounded-md text-black font-semibold"
            to={`${pathname}/trailer`}
          >
            <i className=" mr-2 ri-play-fill"></i>
            Play Trailer
          </Link>
          <Link
            className=" ml-3 px-5 py-4 inline-block bg-[#ffffdd] rounded-md text-black font-semibold"
            to={`${pathname}/player`}
          >
            <i className=" mr-2 ri-play-fill"></i>
            Play <sub>Link 1</sub>
          </Link>
        </div>
      </div>
      <div className=" hidden sm:block w-full  text-white">
          <h1 className="text-4xl sm:text-5xl mb-2  sm:mb-5 font-black">
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.title ||
              info.detail.original_name}
            <small className="text-xl font-semibold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className="w-full h-[25vh] gap-3 text-zinc-100 items-center">
            <div className="w-full gap-3 flex items-center">
            {info.detail.vote_average && (
              <div className=" text-white text-[1.3vw] sm:text-[4vw] bg-yellow-500 w-[3vw] h-[3vw]  sm:w-[10vw] sm:h-[10vw] flex items-center justify-center rounded-full">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
            <h1 className="font-bold  sm:text-2xl leading-none ">
              User <br /> Score
            </h1>
            </div>
            
            <h1 className="text-2xl">{info.detail.first_air_date}</h1>
            <h1 className="text-2xl">{info.detail.genres.map((g, i) => g.name).join(" , ")}</h1>
            {info.detail.runtime && <h1 className="text-2xl">{info.detail.runtime}min</h1> }
          </div>
          <h3 className="text-xl sm:text-2xl mt-2 italic font-semibold">
            {info.detail.tagline}
          </h3>
          <h2 className="text-2xl sm:text-3xl font-bold">overview</h2>
          <p className="text-sm sm:text-xl sm:leading-none leading-none mb-3">{info.detail.overview}</p>

          <h2 className="text-2xl sm:text-3xl font-bold">tv Translated</h2>
          <p className="text-sm sm:text-xl sm:leading-none leading-none mb-5">
            {info.translations.join(" , ")}
          </p>
          <Link
            className="px-5 py-4 inline-block bg-[#ffffdd] rounded-md text-black font-semibold"
            to={`${pathname}/trailer`}
          >
            <i className=" mr-2 ri-play-fill"></i>
            Play Trailer
          </Link>
          <Link
            className=" ml-3 px-5 py-4 inline-block bg-[#ffffdd] rounded-md text-black font-semibold"
            to={`${pathname}/player`}
          >
            <i className=" mr-2 ri-play-fill"></i>
            Play <sub>Link 1</sub>
          </Link>
        </div>
      {/* part 3 watch providers */}
      {/* <div className="w-full h-[30vh] bg-blue-300"> */}
      {info.watchproviders &&
      info.watchproviders.flatrate &&
      info.watchproviders.flatrate ? (
        <div className="w-full h-[10%] flex gap-3 items-center">
          <h1 className="font-semibold  flex justify-end text-white">
            Available On Platforms
          </h1>
          {info.watchproviders &&
            info.watchproviders.flatrate &&
            info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className=" h-[80%] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
        </div>
      ) : (
        ""
      )}
      {info.watchproviders &&
      info.watchproviders.rent &&
      info.watchproviders.rent ? (
        <div className="w-full h-[10%] flex gap-3 items-center">
          <h1 className="font-semibold w-[15%] flex justify-end text-white">
            Available On Rent
          </h1>
          {info.watchproviders &&
            info.watchproviders.rent &&
            info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className=" h-[80%] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
        </div>
      ) : (
        ""
      )}
      {info.watchproviders &&
      info.watchproviders.buy &&
      info.watchproviders.buy ? (
        <div className="w-full h-[10%] flex gap-3 items-center">
          <h1 className="font-semibold w-[15%] flex justify-end text-white">
            Available To Buy
          </h1>
          {info.watchproviders &&
            info.watchproviders.buy &&
            info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className=" h-[80%] rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
        </div>
      ) : (
        ""
      )}

      {/* </div> */}

      {/* part 4 sesons */}

      <div className="mt-5">
        <hr />
        <h1 className="text-2xl font-semibold text-white mt-3 ">Seasons</h1>
        <HorizontalCards data={info.detail.seasons} />
      </div>

      {/* part 4 recommendations and similar  */}

      <div className="mt-5">
        <hr />
        <h1 className="text-2xl font-semibold text-white mt-3 ">
          Recommendations & Similar Stuff
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
      <div className="flex  gap-3 text-2xl text-white  ">
          <h1>MADE BY ❤️ HARSH PATEL</h1>
          <a
            target="_blank"
            href="https://www.instagram.com/harsh_patel_80874/"
          >
            <i className=" ri-instagram-fill"></i>
          </a>
        </div>
    </div>
  ) : (
    <Loading />
  );
};
