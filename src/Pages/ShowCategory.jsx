import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategoryNameProducts } from "../ReduxSystem/Slices/categoryNameSlice";
import Loading from "./../Loading";
import PageNotFound from "../PageNotFound";


const ShowCategory = () => {
  const { categoryProducts, loadingProducts, errorProducts } = useSelector(
    (state) => state.categoryNameProducts
  );

  console.log(categoryProducts);

  const { categoryName } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryNameProducts(categoryName));
  }, []);

  if (loadingProducts) {
    return <Loading />;
  }


  if (errorProducts) {
    return <PageNotFound />;
  }

  return (
    <div className="mt-9 container mx-auto dark:bg-[#1d2029]">
      <h1 className="w-[100%] bg-[#ececec] dark:bg-[#20222f] p-4 text-2xl font-bold shadow-lg border-l-4	border-[#2ec745] dark:border-white text-[#9e9e9e]">
        SEE OUR <span className="uppercase">{categoryName}</span>
      </h1>
      <div className="cards grid grid-cols-4 gap-x-5 gap-y-[5em] mt-[4em]">
        {/* Card */}
        {categoryProducts.map((product, index) => (
          <div
            key={index}
            className="card w-[calc(100% / 4)] bg-base-100 shadow-xl rounded-b-md rounded-t-none relative dark:bg-[#20222f] "
          >
            <figure className="shadow-md ">
              <img
                src={product.images[0]}
                alt=""
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
        
                <Link to={`/showproduct/${product.id}`}>
                  <button className=" bg-white dark:bg-[#1d2029] dark:text-white px-5 py-3 text-xs font-bold w-full">
                    SHOW DETAILS
                  </button>
                </Link>
              
            </div>
            <div className="title-sign absolute bottom-[90%] left-[-1px] px-4 py-2 bg-[#2ec745] dark:bg-[#20222f] text-white font-bold">
              <h1>{product.category}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCategory;
