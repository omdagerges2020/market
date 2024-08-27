import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { auth } from "../Slices/loginSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { showUser } from "../Slices/userSlice";


const config = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const allreducers = combineReducers({
  auth,
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
  showUser,
})


const persistrd = persistReducer(config, allreducers)

export const store = configureStore({
  reducer: persistrd,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const mainStore = persistStore(store);
