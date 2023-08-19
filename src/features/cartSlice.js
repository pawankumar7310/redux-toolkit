import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "Allcart",
  initialState,
  reducers: {
    add(state, action) {
      state.cart.push(action.payload);
    },
    remove(state, action) {
      state.cart = state.cart.filter((data) => data.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
