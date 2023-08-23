import React, { useEffect } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { add, getCartTotal, remove } from "../features/cartSlice";
import { fetchProducts } from "../features/productSlice";
import { STATUSES } from "../features/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { data: product, status } = useSelector((state) => state.product);
  const items = useSelector((state) => state.Allcart.cart);

  console.log("dispatch product", product);
  console.log("navbar data-----", items);

  //add and remove cart
  let cartList = product?.map((data1) =>
    items.some((item2) => item2?.id === data1?.id)
  );
  // Api call
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // change items
  useEffect(() => {
    dispatch(getCartTotal());
  }, [items]);

  if (status === STATUSES.LOADING) {
    return <h1 className="text-center">Loading......</h1>;
  }

  if (status === STATUSES.ERROR) {
    return <h1 className="text-center">something went wrong !</h1>;
  }

  return (
    <div className="product">
      {product?.map((data, i) => (
        <div key={data.id} className="prod text-center">
          <img className="image" src={data.image} alt="product-img" />
          <p>Price {data.price}</p>
          <div className="d-flex flex-column">
            <span>{data.category}</span>

            {cartList[i] ? (
              <button
                className="btn btn-danger"
                onClick={() => dispatch(remove(data.id))}
              >
                remove to Cart
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => dispatch(add(data))}
              >
                add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
