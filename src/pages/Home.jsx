import React, { useEffect } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/cartSlice";
import { fetchProducts } from "../features/productSlice";
import { STATUSES } from "../features/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { data: product, status } = useSelector((state) => state.product);
  const items = useSelector((state) => state.cart);

  console.log("dispatch product", product);
  console.log("navbar data-----", items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (data) => {
    dispatch(add(data));
  };

  if (status === STATUSES.LOADING) {
    return <h1 className="text-center">Loading......</h1>;
  }

  if (status === STATUSES.ERROR) {
    return <h1 className="text-center">something went wrong !</h1>;
  }

  return (
    <div className="product">
      {product?.map((data) => (
        <div key={data.id} className="prod text-center">
          <img className="image" src={data.image} alt="product-img" />
          <p>Price {data.price}</p>
          <div className="d-flex flex-column">
            <span>{data.category}</span>
            <button
              className="btn btn-success"
              onClick={() => handleAddProduct(data)}
            >
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
