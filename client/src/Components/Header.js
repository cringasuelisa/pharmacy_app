import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { addToCart, logo_2, user } from "../assets/index";
import Dropdown from "./Dropdown";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebaseConfig";

const Header = () => {
  const auth = getAuth(firebaseApp);

  const logOut = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  const { cartItems } = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("User is signed in.", user);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  useEffect(() => {
    let sum = 0;
    cartItems?.forEach((item) => {
      sum += item.cantitate;
    });
    setTotalQuantity(sum);
  }, [cartItems]);

  return (
    <div className="w-full h-20 bg-green-200 border-b-[1px] border-b-gray-800 font-serif sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img className="w-14" src={logo_2} alt="logo_2" />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <Link to="/">
              <li
                className="text-base text-black font-bold hover:text-orange-900 
                    hover:underline underline-offset-2 decoration-[1px] cursor-pointer
                    duration-300"
              >
                Acasa
              </li>
            </Link>
            <Link to="/shop">
              <li
                className="text-base text-black font-bold hover:text-orange-900 
                    hover:underline underline-offset-2 decoration-[1px] cursor-pointer
                    duration-300"
              >
                Farmacie
              </li>
            </Link>
            <Link to="/blog">
              <li
                className="text-base text-black font-bold hover:text-orange-900 
                    hover:underline underline-offset-2 decoration-[1px] cursor-pointer
                    duration-300"
              >
                Blog
              </li>
            </Link>

          </ul>
          <div className="relative">
            <Link to="/cart">
              <img className="w-8" src={addToCart} alt="cartLogo" />
              <span className="absolute w-6 top-2 left-1 test-sm flex items-center justify-center font-semibold">
                {totalQuantity}
              </span>
            </Link>
          </div>
          <div className="relative">
            <Dropdown
              button={
                <img
                  src={require("../assets/user.png")}
                  className="w-8 h-8 rounded-full"
                />
              }
              children={
                <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-green-500 dark:text-white dark:shadow-none">
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-green-900 dark:text-white">
                        👋 Hey, there!
                      </p>{" "}
                    </div>
                  </div>
                  <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

                  <div className="flex flex-col p-4">
                    {/* <a
                      href=" "
                      className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                    >
                      Profile Settings
                    </a> */}
                    {user ? (
                      <a
                        href="/login"
                        onClick={logOut}
                        className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                      >
                        Log Out
                      </a>
                    ) : (
                      <a
                        href="/login"
                        className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                      >
                        Log In
                      </a>
                    )}
                  </div>
                </div>
              }
              classNames={"py-2 top-8 -left-[180px] w-max"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;