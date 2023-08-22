import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebaseConfig";

const MedicamentCard = ({ med }) => {
  const [error, setError] = useState(null);
  const auth = getAuth(firebaseApp);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const _id = med.denumire;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").slice(0, 1);
  };
  const rootId = idString(_id);
  const handleDetails = () => {
    navigate(`/medicament/${rootId}`, {
      state: {
        item: med,
      },
    });
  };

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
      _id: med._id,
      denumire: med.denumire,
      image: med.image,
      pret: med.pret,
      cantitate: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="relative min-w-[350px] max-w-[350px] m-2 py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 hover:translate-x-2 transition-transform cursor-pointer duration-500">
      <div onClick={handleDetails}>
        <img
          className="object-cover h-[170px] w-[170px] block mx-auto sm:mx-0 sm:shrink-0"
          src={med.image}
          alt="medImg"
        />
      </div>
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">
            {med.denumire.substring(0, 20)}...
          </p>
          <p className="text-slate-500 font-medium">{med.pret} RON</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-black py-2 px-4 border border-gray-600 hover:border-transparent rounded"
        >
          Adauga in cos
        </button>
        {error && (
          <p className="text-red-500 text-center text-sm mt-10">{error}</p>
        )}
      </div>
    </div>
  );
};

export default MedicamentCard;
