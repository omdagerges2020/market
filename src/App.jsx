import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import { useEffect, useState } from "react";
import ShowCategory from "./Pages/ShowCategory";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Editprofile from "./Pages/Editprofile";
import PageNotFound from "./PageNotFound";


const App = () => {
  const [changeMode, setChangeMode] = useState(true)
  const [cartProducts, setCartProducts] = useState([]);
  // console.log(cartProducts);

  // Function add to cart
  const addToCart = (obj, itemsNumber) => {
    const checkArr = cartProducts.some((prod) => {
      return prod.id == obj.id;
    });
    if (!checkArr) {
      const finalArr = [...cartProducts, { ...obj, quantity: itemsNumber }];
      setCartProducts(finalArr);
    }else {
      const counter = cartProducts.map((it) => {
        if (it.id === obj.id) {
          it.quantity++;
        }
        return it;
      });
      setCartProducts(counter);
    }
  };

  // UseEffect
  useEffect(()=>{
    if(localStorage.theme === "dark"){
      document.documentElement.classList.add("dark");
      // console.log("dark");
    }else {
      document.documentElement.classList.remove("dark");
      // console.log("light");
    }
  },[changeMode])


  // Swith mode color function
  const handleChangeMode = ()=>{
    if(localStorage.theme === "dark"){
      localStorage.theme = "light"
      setChangeMode(!changeMode)
      // console.log("light");
    }else {
      localStorage.theme = "dark"
      setChangeMode(!changeMode)
      // console.log("dark");
    }
  }


  return (
    <div className="dark:bg-[#1d2029] bg-white">
      <Header cartProducts={cartProducts} handleChangeMode={handleChangeMode}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/showproduct/:productId"
          element={
            <ProductDetails
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/cart" element={<Cart cartProducts={cartProducts} setCartProducts={setCartProducts}/>} />
        <Route path="/category/:categoryName" element={<ShowCategory/>} />
        <Route path="/search/:searchKey" element={<Search/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile/:userId" element={<Profile/>} />
        <Route path="/editprofile/:userId" element={<Editprofile/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>

      <Footer/>
    </div>
  );
};

export default App;
