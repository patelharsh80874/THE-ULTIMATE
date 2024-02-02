import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:null,
}


export const tvSlice = createSlice({
    name: 'tv',
    initialState,
    reducers: {
        loadtv: (state,action)=>{
            state.info = action.payload;
        },
        removetv: (state,action)=>{
            state.info = null
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loadtv, removetv } = tvSlice.actions
  
  export default tvSlice.reducer