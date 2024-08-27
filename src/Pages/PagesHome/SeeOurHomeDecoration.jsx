import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHomeDecorationProducts } from "../../ReduxSystem/Slices/homeDecorationSlice";
import Loading from './../../Loading';
import PageNotFound from "../../PageNotFound";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';


const SeeOurHomeDecoration = () => {
  const {homeDecoration, loadingHomeDecoration, errorHomeDecoration} = useSelector((state)=>state.homeDecorationProducts);

  // Dispatching
  const dispatch = useDispatch();

  // useEffect
  useEffect(()=>{
    dispatch(getHomeDecorationProducts())
  },[])

  // Loading condition
  if(loadingHomeDecoration){
    return <Loading/>
  }


  // Error condition
  if(errorHomeDecoration){
    return <PageNotFound/>
  }


  return (
    <div className="mt-9 container mx-auto px-5 lg:px-0 xl:px-0">
      <h1 className="w-[100%] dark:bg-[#20222f] dark:border-white bg-[#ececec] p-4 text-2xl font-bold shadow-lg border-l-4	border-[#2ec745] text-[#9e9e9e]">
        SEE OUR HOME-DECORATION
      </h1>
      <div className="cards grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-5 gap-y-[5em] mt-[4em]">
        {/* Card */}
        {homeDecoration.map((product, index) => (
          <LazyLoad
            key={index}
            className="card dark:shadow-sm dark:shadow-white	dark:bg-[#20222f] w-[calc(100% / 4)] bg-base-100 shadow-xl rounded-b-md rounded-t-none relative "
          >
            <figure className="shadow-md ">
              <img
                src={product.images[0]}
                alt="Shoes"
                style={{ height: "320px" }}
              />
            </figure>
            <div className="card-body flex flex-col items-center p-7">
              <h2 className="card-title text-[1.1em] dark:text-white">
                Brand: {product.brand}
              </h2>
              <hr className="w-[100%] text-gray-600 h-[1.5px]" />
              <p className="text-[#747474] text-center">{product.title}</p>
              <div>
                <span className="text-[#747474] line-through">
                  EGP {product.price}
                </span>{" "}
                <span className="text-gray-700 font-bold dark:text-white">
                  EGP{" "}
                  {(
                    product.price -
                    (product.discountPercentage / 100) * product.price
                  ).toFixed(2)}
                </span>{" "}
                <span className="text-[#2ec745] text-sm dark:text-gray-700">(% Off)</span>
              </div>
              <hr className="w-[25%] bg-[#2ec745] h-[1.5px]" />
              <div className="card-actions justify-center w-[100%] mt-3">
                <Link to={`/showproduct/${product.id}`}>
                  <button className="btn btn-[#e9eaeb] text-xs font-bold w-[100%] dark:bg-[#1d2029] dark:text-white">
                    SHOW DETAILS
                  </button>
                </Link>
              </div>
            </div>
            <div className="title-sign absolute dark:bg-[#20222f] bottom-[90%] left-[-1px] px-4 py-2 bg-[#2ec745] text-white font-bold">
              <h1>{product.category}</h1>
            </div>
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};

export default SeeOurHomeDecoration;
