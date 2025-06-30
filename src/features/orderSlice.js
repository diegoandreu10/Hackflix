import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order.order_id !== orderId);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const selectOrders = (state) => state.orders.orders;
export const { setOrders, addOrder, removeOrder, clearOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
