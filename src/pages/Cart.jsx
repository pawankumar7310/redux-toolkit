import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { remove } from "../features/cartSlice";

export default function Cart() {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log("cart", products);

  const handleRemoveProduct = (id) => {
    dispatch(remove(id));
    // console.log("product id", id);
  };
  return (
    <div>
      <h1>Cart</h1>
      {products.map((data) => (
        <div key={data.id} className="cart">
          <img className="cart-img" src={data.image} alt="product-img" />
          <span>{data.category}</span>
          <p> Rs {data.price}</p>

          <button
            className="btn btn-danger"
            onClick={() => handleRemoveProduct(data.id)}
          >
            remove to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
