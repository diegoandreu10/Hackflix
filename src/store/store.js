import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import moviesReducer from "../features/moviesSlice";
import orderReducer from "../features/orderSlice";
import userReducer from "../features/userSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
    movies: moviesReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
