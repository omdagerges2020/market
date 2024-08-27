import React from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = ({ cartProducts, setCartProducts }) => {
  // console.log(cartProducts);

  // Increment function
  const incrementProduct = (product) => {
    const counter = cartProducts.map((it) => {
      if (it.id === product.id) {
        it.quantity++;
      }
      return it;
    });
    setCartProducts(counter);
  };

  // Decrement function
  const decrementProduct = (product) => {
    const counter2 = cartProducts.map((it) => {
      if (it.id === product.id) {
        if (it.quantity > 1) {
          it.quantity--;
        }
      }
      return it;
    });
    setCartProducts(counter2);
  };

  // delete function
  const deleteProduct = (product) => {
    const deleteItems = cartProducts.filter((it) => {
      return it.id !== product.id;
    });
    setCartProducts(deleteItems);
    // console.log("delete");
  };

  // clear function
  const clearProducts = (product) => {
    setCartProducts([]);
  };

  return (
    <div className="dark:bg-[#1d2029]">
      {cartProducts.length == 0 ? (
        <div className="bg-[#eaeaea] flex justify-center items-center flex-col w-full h-screen gap-3 ">
          {" "}
          {/* Image */}
          <div className="image">
            <img
              src="https://goomarket.vercel.app/assets/shopping_cart-b0846037.png"
              alt=""
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          {/* Text */}
          <div className="text">
            <h1>Your shopping cart is empty</h1>
          </div>
          {/* back to home button */}
          <div className="bottom">
            <Link to={"/"}>
              <button className="btn bg-green-900 hover:bg-green-900 text-white">
                GO SHOPPING NOW
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#eaeaea] w-full h-screen ">
          <div className="container mx-auto pt-[3em]">
            <table className="table bg-white">
              {/* head */}
              <thead className="bg-[#eceff1] text-center font-bold text-lg">
                <tr>
                  <th>S.R</th>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {cartProducts.map((prod, index) => (
                <tbody key={index} className="text-center">
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>{prod?.title}</td>
                    <td>
                      {" "}
                      EGP{" "}
                      {(
                        prod.price -
                        (prod.discountPercentage / 100) * prod.price
                      ).toFixed(2)}
                    </td>
                    <td>
                      <div className="join">
                        <button
                          className="join-item btn"
                          onClick={() => decrementProduct(prod)}
                        >
                          -
                        </button>
                        <button className="join-item btn">
                          {prod.quantity}
                        </button>
                        <button
                          className="join-item btn"
                          onClick={() => incrementProduct(prod)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {" "}
                      EGP{" "}
                      {prod.quantity *
                        (prod.price -
                          (prod.discountPercentage / 100) * prod.price).toFixed(2)}
                    </td>
                    <td className="text-green-700 hover:text-green-400 font-bold">
                      <button onClick={() => deleteProduct(prod)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            <div className="clear-cart bg-white mt-6 p-4 rounded-b-xl">
              <div className="clear flex justify-between">
                <button
                  onClick={() => clearProducts()}
                  className="btn bg-transparent hover:bg-transparent hover:text-green-500 px-7 text-green-900 border-green-900 hover:border-green-500	"
                >
                  <MdDelete />
                  CLEAR CART
                </button>
                <div className="text">
                  Total (1) items :{" "}
                  <span className="font-bold text-green-800 text-xl">
                    EGP{" "}
                    {cartProducts.length > 0
                      ? cartProducts
                          .map(
                            (itemp) =>
                              itemp.quantity *
                              (itemp.price -
                                (itemp.discountPercentage / 100) * itemp.price)
                          )
                          .reduce((x, y) => x + y)
                          .toFixed(2)
                      : ""}
                  </span>
                </div>
              </div>
              <div className="checkout flex justify-end">
                <button className="btn bg-green-900 hover:bg-green-800 px-7 text-white hover:shadow-md border-none hover:shadow-green-600	">
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
