import { configureStore } from '@reduxjs/toolkit'
import movieReducer from "../store/reducers/movieSlice";
import tvReducer from "../store/reducers/tvSlice";
import personReducer from "../store/reducers/personSlice";
export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
  },
})

