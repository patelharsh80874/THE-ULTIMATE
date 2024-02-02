import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzExYzUyMTM2ODEzZmJmZmJiYTU2Y2Q4Yzc2YzY1YiIsInN1YiI6IjY1YWY5MmU2ODQ4ZWI5MDBjYTRlZjYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HghQOvLuhgFTKsVIckQJAgScbSnZbo8_OftXwfLQqi8'
      },
})
 
export default instance;