import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import {
  remove,
  incrementPrice,
  decrementPrice,
  getCartTotal,
} from "../features/cartSlice";

export default function Cart() {
  const products = useSelector((state) => state.Allcart.cart);
  const totalPrice = useSelector((state) => state.Allcart.totalPrice);
  console.log("my product---", products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [products]);
  return (
    <>
      <div>
        <h1>Cart</h1>
        <h4>Items {products.length}</h4>
        {products?.map((data) => (
          <div key={data.id} className="cart">
            <img className="cart-img" src={data.image} alt="product-img" />
            <span>{data.category}</span>
            <button onClick={() => dispatch(incrementPrice(data.id))}>
              add
            </button>
            <p> Rs {data.price}</p>

            <button onClick={() => dispatch(decrementPrice(data.id))}>
              dec
            </button>

            <p>quantity : {data.quantity}</p>
            <p>One product price {data.price * data.quantity}</p>

            <button
              className="btn btn-danger"
              onClick={() => dispatch(remove(data.id))}
            >
              remove to Cart
            </button>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-end">{totalPrice}</h1>
      </div>
    </>
  );
}
