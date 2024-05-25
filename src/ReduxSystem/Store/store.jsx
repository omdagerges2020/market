import { configureStore } from "@reduxjs/toolkit";
import { products } from "./../Slices/allProductsSlice";
import { smartPhonesProducts } from "../Slices/smartPhonesSlice";
import { laptopsProducts } from "../Slices/laptopsSlice";
import { fragrancesProducts } from "../Slices/fragrancesSlice";
import { skincareProducts } from "../Slices/skincareSlice";
import { groceriesProducts } from "../Slices/groceriesSlice";
import { homeDecorationProducts } from "../Slices/homeDecorationSlice";
import { productDetails } from "../Slices/ShowProductSlice";
import { categoriesNames } from "../Slices/categoriesSlice";
import { categoryNameProducts } from "../Slices/categoryNameSlice";
import { searchProducts } from "../Slices/searchSlice";


const store = configureStore({
  reducer: {
    products,
    smartPhonesProducts,
    laptopsProducts,
    fragrancesProducts,
    skincareProducts,
    groceriesProducts,
    homeDecorationProducts,
    productDetails,
    categoriesNames,
    categoryNameProducts,
    searchProducts,
  },
});

export default store;
