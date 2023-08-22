import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebaseConfig";

const Medicament = () => {
  const auth = getAuth(firebaseApp);
  const [details, setDetails] = useState({});
  const [user, setUser] = useState(null);
  const [cantitate, setCantitate] = useState(1);
  const location = useLocation();
  const { updateCartItemQuantity } = useContext(CartContext);
  const [error, setError] = useState(null);

  const scadeCantitate = () => {
    if (cantitate > 1) {
      setCantitate(cantitate - 1);
    }
  };

  const cresteCantitate = () => {
    setCantitate(cantitate + 1);
  };

  useEffect(() => {
    setDetails(location.state.item);
  }, [location]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      setError("Vă rugăm să vă autentificați pentru a putea continua.");
      return;
    }
    const cartItem = {
      _id: details._id,
      denumire: details.denumire,
      image: details.image,
      pret: details.pret,
      cantitate: cantitate,
    };
    updateCartItemQuantity(cartItem._id, cantitate);
  };

  return (
    <div>
      {error && (
        <p className="text-red-500 text-center text-lg mt-10">{error}</p>
      )}
      <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
        <div className="w-2/5 relative">
          <img
            className="w-full h-[550px] object-cover"
            src={details.image}
            alt="productImg"
          />
        </div>
        <div className="w-3/5 flex flex-col justify-center gap-12">
          <div>
            <h2 className="text-4xl font-semibold">{details.denumire}</h2>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-2xl font-medium text-gray-900">
                {details.pret} RON
              </p>
            </div>
          </div>
          <p className="text-base text-gray-500 -mt-3">{details.descriere}</p>
          <div className="flex gap-4">
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Cantitate</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={scadeCantitate}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-green-300 hover:text-white cursor-pointer duration-300 active:bg-green-400"
                >
                  -
                </button>
                <span>{cantitate}</span>
                <button
                  onClick={cresteCantitate}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-green-300 hover:text-white cursor-pointer duration-300 active:bg-green-400"
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="bg-green-200 text-black py-3 px-6 active:bg-green-400 hover:bg-green-300"
              onClick={handleAddToCart}
            >
              Adauga in cos
            </button>
          </div>
          <p className="text-base text-gray-500">
            Categorii:{" "}
            <span className="font-medium capitalize">{details.keywords}</span>
          </p>
          <p className="text-base text-gray-500">
            {details.stoc > 0 ? "In stoc" : "Stoc epuizat"}
          </p>
        </div>
      </div>
      <div className="text-green-500 mb-16 text-right mr-32 text-lg">
        <Link to="/shop">Inapoi la farmacie</Link>
      </div>
    </div>
  );
};

export default Medicament;
