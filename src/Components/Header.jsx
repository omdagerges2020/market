import React, { useEffect, useState } from "react";
import {
  Collapse,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaBagShopping } from "react-icons/fa6";
import { Drawer, Button, List } from "@material-tailwind/react";
import { MdOutlineSegment } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./../ReduxSystem/Slices/categoriesSlice";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const Header = ({ cartProducts, handleChangeMode }) => {
  // Selector
  const { categories } = useSelector((state) => state.categoriesNames);
  // Use State
  const [searchInput, setInput] = useState("");
  const [openNav, setOpenNav] = useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  console.log(categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // const navigate = useNavigate();

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="px-7 py-3 rounded-none bg-green-900 w-full  dark:bg-[#1d2029] bg-opacity-1">

      {/* side menue and search input part */}
      <div className="items-center w-full flex gap-4">
        {/* Logo and side menue */}
        <div className="logo lg:flex xl:flex flex items-center gap-1 text-white flex-none ">
          {/* Side Menue */}
          <React.Fragment>
            <MdOutlineSegment
              className="text-[3em] relative"
              onClick={openDrawer}
            />
            <Drawer
              open={open}
              onClose={closeDrawer}
              className="overflow-scroll	"
            >
              <div className="mb-2 flex items-center justify-between p-4">
                <Typography variant="h5" color="blue-gray">
                  Side Menue
                </Typography>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={closeDrawer}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
              </div>
              <List className="z-[9999] bg-white flex flex-col gap-2">
                {categories.map((cat, index) => (
                  <Typography
                    as="li"
                    variant="small"
                    color="black"
                    className="p-1 font-medium"
                    key={index}
                  >
                    <a
                      href={`/category/${cat.slug}`}
                      className="flex items-center text-lg hover:text-green-500 transition-colors"
                    >
                      {cat.name}
                    </a>
                  </Typography>
                ))}
              </List>
            </Drawer>
          </React.Fragment>

          {/* ShopBag Icon */}
          <FaBagShopping className="text-[2em]" />

          {/* Logo Word */}
          <Typography
            as={Link}
            to="/"
            variant="h4"
            className="cursor-pointer py-1.5 text-2xl"
          >
            Goo-Market
          </Typography>
        </div>

        {/* Search input and links */}
        <div className="hidden md:hidden xl:block lg:block flex-1">
          {/* input */}
          <div className="relative flex gap-2">
            <Input
              type="search"
              color="white"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
              onChange={(e) => setInput(e.target.value)}
            />
            <Link to={`/search/${searchInput}`}>
              <Button
                size="sm"
                color="white"
                className="!absolute right-3 top-1 rounded"
              >
                Search
              </Button>
            </Link>
          </div>
          {/* links */}
          <div className="links flex gap-7 p-1 capitalize items-center text-sm text-white flex-wrap">
            {categories.slice(0, 8).map((cat, index) => (
              <div key={index}>
                <Typography
                  as="li"
                  variant="small"
                  color="white"
                  className="font-medium"
                >
                  <a
                    href={`/category/${cat.slug}`}
                    className=" hover:text-green-500 transition-colors"
                  >
                    {cat.name}
                  </a>
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Shop Icon */}
        <div className="hidden md:hidden lg:block xl:block flex-none">
          <Menu open={openMenu} handler={setOpenMenu} allowHover>
            <MenuHandler>
              <Button
                variant="text"
                className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
              >
                <div className="cart-icon relative">
                  <Link to="/cart">
                    <GiShoppingCart className="text-[2em] text-white font-bold" />
                  </Link>
                  <div className="absolute top-[-10px] right-[-3px] w-[20px] h-[25px] bg-white p-1 rounded-full flex justify-center items-center">
                    <span className=" text-green-500">
                      {cartProducts.length}
                    </span>
                  </div>
                </div>
              </Button>
            </MenuHandler>
            <MenuList className="hidden p-0 w-[25rem] overflow-visible lg:flex lg:flex-col dark:bg-[#1d2029] rounded-md">
              <div className="py-6 flex justify-center border-b-2	border-green-500 dark:border-white">
                <h1 className=" text-xl text-green-900 dark:text-white">
                  Recently Added Products
                </h1>
              </div>
              {cartProducts.length > 0 ? (
                cartProducts.map((prod, index) => (
                  <Link to={`/showproduct/${prod.id}`} key={index}>
                    <div className="content flex justify-between px-4 py-6 items-center border-b-2 hover:bg-[#20222f] border-gray-300">
                      <div className="logo flex gap-1 items-center">
                        <img
                          src={prod.thumbnail}
                          style={{ width: "50px", height: "50px" }}
                          alt=""
                        />
                        <span className="text-black dark:text-white">
                          {prod.title}
                        </span>
                      </div>
                      <div className="price flex justify-center">
                        <span className="font-bold text-green-600 dark:text-white">
                          {" "}
                          EGP{" "}
                          {(
                            prod.price -
                            (prod.discountPercentage / 100) * prod.price
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="content dark:bg-[#1d2029] flex flex-col justify-between px-4 py-6 items-center dark:border-b-0 border-b-2 hover:bg-gray-400 border-gray-300">
                  <div className="logo flex gap-1 items-center">
                    <img
                      src="https://goomarket.vercel.app/assets/shopping_cart-b0846037.png"
                      style={{ width: "100px", height: "100px" }}
                      alt=""
                    />
                  </div>
                  <div className="price flex justify-center">
                    <span className="font-bold text-green-600 dark:text-white">
                      No Products Yet!
                    </span>
                  </div>
                </div>
              )}
              <div
                className={
                  cartProducts.length > 0
                    ? "view-cart py-6 px-2 flex justify-end items-center border-0 hover:border-0 xl:hover:border-0 lg:border-0 xl:border-0		"
                    : "view-cart py-6 px-2 flex justify-center items-center border-0 xl:border-0 hover:border-0	"
                }
              >
                <Link to={`/cart`} className="shadow-md	 shadow-blue-800">
                  <Button className="bg-green-900 dark:bg-[#20222f]  text-center border-0 hover:border-0 lg:border-0 xl:border-0 xl:outline-0">
                    {cartProducts.length > 0
                      ? "VIEW MY SHOPPING CART"
                      : "GO SHOPPING NOW"}
                  </Button>
                </Link>
              </div>
            </MenuList>
          </Menu>
          <Button
              className="bg-transparent hover:shadow-none shadow-none text-[1.5em]"
              onClick={() => handleChangeMode()}
            >
              {localStorage.theme === "light" ? <IoSunny /> : <FaMoon />}
            </Button>
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* Collapse */}
      <Collapse open={openNav}>
        <div className="main-nav flex items-center gap-5">
          <div className="flex flex-col w-[100%]">
            {/* Search Input */}
            <div className="relative flex  gap-2 ">
              <Input
                value={searchInput}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                color="white"
                label="Type here..."
                className="pr-20"
              />
              <Link to={`/search/${searchInput}`}>
                <Button
                  size="sm"
                  color="white"
                  className="absolute right-2 top-1 rounded bg-green-500 opacity-30 text-white	"
                >
                  Search
                </Button>
              </Link>
            </div>
            {/* Links */}
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 flex-none h-[100px] overflow-y-scroll">
              {categories.slice(0, 8).map((cat, index) => (
                <div key={index}>
                  <Typography
                    as="li"
                    variant="small"
                    color="white"
                    className="p-1 font-medium"
                  >
                    <a
                      href={`/category/${cat.slug}`}
                      className="flex items-center hover:text-green-500 transition-colors"
                    >
                      {cat.name}
                    </a>
                  </Typography>
                </div>
              ))}
            </ul>
            {/* dark&light Mode && Cart */}
            <div className="cart-icon relative mt-3 w-full flex justify-between items-center">
              <Link to="/cart">
                <GiShoppingCart className="text-[2em] text-white font-bold" />
              </Link>
              <div className="absolute top-[-10px] left-[15px] w-[20px] h-[25px] bg-white p-1 rounded-full flex justify-center items-center">
                <span className=" text-black">{cartProducts.length}</span>
              </div>
              <Button
                className="bg-transparent hover:shadow-none shadow-none text-[1.5em]"
                onClick={() => handleChangeMode()}
              >
                {localStorage.theme === "light" ? <IoSunny /> : <FaMoon />}
              </Button>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Header;
