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
      <nav className="w-full h-[10vh]  text-zinc-100 flex  gap-7 items-center font-semibold text-1xl  ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
        ></Link>
        <Link target="_blank" href={info.detail.homepage}>
          <i className="hover:text-yellow-300 duration-200 ri-external-link-fill"></i>
        </Link>
        <Link
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-yellow-300 duration-200 ri-earth-fill"></i>
        </Link>
        <Link
          className="hover:text-yellow-300 duration-200"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </Link>
        <Link href={`/`}>
          <i className="hover:text-yellow-300 duration-200 ri-home-4-line"></i>
        </Link>
      </nav>
      {/* part 2 poster details */}
      <div className="w-full h-[70vh] flex">
        <div className="w-[30%] h-full flex items-center justify-center">
          <img
            className=" w-[55%] shadow-md rounded "
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
        </div>
        <div className="w-[70%] h-full text-white">
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
        </div>
      </div>
      {/* part 3 watch providers */}
      {/* <div className="w-full h-[30vh] bg-blue-300"> */}
      {info.watchproviders &&
      info.watchproviders.flatrate &&
      info.watchproviders.flatrate ? (
        <div className="w-full h-[10%] flex gap-3 items-center">
          <h1 className="font-semibold w-[15%] flex justify-end text-white">
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
    </div>
  ) : (
    <Loading />
  );
};
