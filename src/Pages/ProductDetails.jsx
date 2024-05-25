import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  decrement,
  getProductDetails,
  increment,
} from "../ReduxSystem/Slices/ShowProductSlice";
import { FiShoppingCart } from "react-icons/fi";
import Loading from "./../Loading";
import PageNotFound from "../PageNotFound";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductDetails = ({ addToCart }) => {
  const { productDetails, loadingProductDetails, errorProductDetails } =
    useSelector((state) => state.productDetails);

  // console.log(productDetails);

  // UseParams
  const { productId } = useParams();

  // Dispatching
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, []);

  // Loading condition
  if (loadingProductDetails) {
    return <Loading />;
  }

  // Error condition
  if (errorProductDetails) {
    return <PageNotFound />;
  }

  return (
    <div className="bg-[#eaeaea] dark:bg-[#1d2029] py-7">
      <div className="main container mx-auto bg-white dark:bg-[#252b43] py-4 px-6">
        <div className="product-box flex flex-col lg:flex-row md:flex-row gap-3 ">
          {/* Images part */}
          <div className="images flex flex-col">
            <Zoom>
              <div className="main">
                <img src={productDetails.thumbnail} alt="" style={{width: "500px", height: "500px"}} />
              </div>
            </Zoom>

            <div className="another-img w-[90%] flex gap-3 justify-center flex-wrap items-center mt-5">
              {productDetails?.images.map((i, index) => (
                <Zoom>
                  <div
                    key={index}
                    className="image hover:border-2 hover:border-green-600 px-2 py-4 w-[100px] h-[120px] flex justify-center items-center"
                  >
                    <img
                      className="hover:scale-75 transition delay-150 duration-300 ease-in-out "
                      src={i}
                      alt=""
                      style={{ height: "70px", width: "85px" }}
                    />
                  </div>
                </Zoom>
              ))}
            </div>
          </div>

          {/* Details Part */}
          <div className="details w-[100%] lg:w-[50%] flex flex-col gap-3 ">
            <h1 className="dark:text-white">{productDetails?.title}</h1>
            <hr />
            {/* Description */}
            <span className="text-gray-500">{productDetails?.description}</span>
            {/* Rate && Brand && Category */}
            <div className="text-[#2ec745] flex gap-3 dark:text-white">
              <span className="text-[#757575]">
                Rating: {productDetails?.rating}
              </span>
              |
              <span className="text-[#757575]">
                Brand: {productDetails?.brand}
              </span>
              |
              <span className="text-[#757575]">
                Category: {productDetails?.category}
              </span>
            </div>
            {/* Price Box */}
            <div className="price bg-[#eaeaea] p-4 mt-5 w-[100%] dark:bg-[#1d2029]">
              <div className="main-price flex gap-3 text-gray-500">
                <span className="line-through	">EGP {productDetails?.price}</span>
                <span>Inclusive of taxes</span>
              </div>
              <div className="after-discount flex gap-3 mt-6">
                <span className="font-bold text-green-800 text-xl dark:text-white">
                  EGP{" "}
                  {(
                    productDetails?.price -
                    (productDetails?.discountPercentage / 100) *
                      productDetails?.price
                  ).toFixed(2)}
                </span>
                <span className="bg-green-800 dark:bg-[#252b43] py-[3px] px-4 text-white">
                  {productDetails?.discountPercentage}% off
                </span>
              </div>
            </div>
            {/* Quantity */}
            <div className="quantity flex gap-3 items-center mt-7">
              <span className="dark:text-gray-500">Quantity:</span>
              <div className="join">
                <button
                  onClick={() => dispatch(decrement(productDetails))}
                  className="join-item btn dark:bg-[#1d2029] border-0 dark:text-white"
                >
                  -
                </button>
                <button className="join-item btn dark:bg-[#1d2029] border-0 dark:text-white">
                  {productDetails.items}
                </button>
                <button
                  onClick={() => dispatch(increment(productDetails))}
                  className="join-item btn dark:bg-[#1d2029] border-0 dark:text-white"
                >
                  +
                </button>
              </div>
            </div>
            <div className="addtocart flex w-fit gap-3 mt-7">
              <button
                onClick={() => addToCart(productDetails, productDetails.items)}
                className="btn bg-green-700 dark:bg-[#20222f] dark:hover:bg-[#20222f] hover:bg-green-800 px-7 text-white border-0 shadow-md dark:hover:shadow-white	 shadow-blue-800"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button className="btn bg-green-700 hover:bg-green-800 text-white border-0 dark:bg-[#20222f] dark:hover:bg-[#20222f] shadow-md dark:hover:shadow-white	 shadow-blue-800">
                <FiShoppingCart />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
