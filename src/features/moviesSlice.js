import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { setMovies, clearMovies } = movieSlice.actions;
export const selectMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
