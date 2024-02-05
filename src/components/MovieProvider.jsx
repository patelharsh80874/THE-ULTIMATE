import React, { useEffect, useState } from "react";
import { Topnav } from "./templates/Topnav";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Dropdown } from "./templates/Dropdown";
import Loading from './Loading';

const MovieProvider = () => {
    const navigate = useNavigate();
    const [getProviders, setgetProviders] = useState([]);
    const [regions, setregions] = useState([]);
    const [selectregion, setselectregion] = useState("IN");

    const getMovieProviders = async () => {
        try {
            const { data } = await axios.get(
                `/watch/providers/movie?language=en-US&watch_region=${selectregion}`
            );
            setgetProviders(data.results);
        } catch (error) {
            console.log("error", error);
        }
    };
    const getregions = async () => {
        try {
            const { data } = await axios.get(`/watch/providers/regions`);
            setregions(data.results.map((e) => e.iso_3166_1));
        } catch (error) {
            console.log("error", error);
        }
    };
        

        useEffect(() => {
            // refershHandler();
            getregions();
            getMovieProviders();
        }, [selectregion]);

        // console.log(getProviders);
        return getProviders ? (
            <div className="w-full">
                <div className="flex items-center w-full px-[2vw] ">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#ffffdd]  hover:bg-lime-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-arrow-left-line"
                    ></i>
                    <Topnav />
                    <Dropdown
                        title="Select Region"
                        options={regions}
                        func={(e) => setselectregion(e.target.value)}
                    />
                </div>
                <div className="w-full bg-[#303030] p-[2vw] flex flex-wrap gap-[1vw] items-center justify-center">
                    {getProviders.map((d, i) => (
                        <div
                            key={i}
                            className="w-[10vw] sm:w-[30vw] m-5  flex flex-col  items-center h-[10vw] "
                        >
                            <img
                                className="rounded-md w-[6vw] sm:w-[10vw]"
                                src={`https://image.tmdb.org/t/p/original/${d.logo_path}`}
                                alt=""
                            />
                            <h2 className="text-center text-zinc-200">{d.provider_name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        ):<Loading />;
    };

    export default MovieProvider;
