import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,

  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "Allcart",
  initialState,
  reducers: {
    add(state, action) {
      state.cart.push({ ...action.payload, quantity: 1 });
    },

    remove(state, action) {
      state.cart = state.cart.filter((data) => data.id !== action.payload);
    },

    incrementPrice(state, action) {
      console.log("incAction", action.payload);
      state.cart = state.cart.map((item) => {
        console.log("inc state---->", item);
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    decrementPrice(state, action) {
      console.log("decAction", action.payload);
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    },

    // getCartTotal(state, action) {
    //   console.log("get cart", action.payload);
    //   console.log("get cart---", state.cart);
    //   state.cart = state.cart.reduce(
    //     (acc, currentValue) => acc + currentValue,
    //     0
    //   );
    // },
    getCartTotal: (state) => {
      console.log("get cart", state.cart);
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
  },
});

export const { add, remove, incrementPrice, decrementPrice, getCartTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
