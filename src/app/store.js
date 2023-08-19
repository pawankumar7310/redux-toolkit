import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "../features/cartSlice";
import productSlice from "../features/productSlice";

const store = configureStore({
  reducer: {
    Allcart: cartSlice,
    product: productSlice,
  },
});
export default store;
