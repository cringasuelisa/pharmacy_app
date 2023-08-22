import { React, useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../api/mongo_utils";
import { toast } from "react-toastify";
import { CartContext } from "../Context/CartContext";

const stripePromise = loadStripe("pk_test_51NNKATK3jAPZkUIlRhaqj1SIRC3CRIwsRdKpjRUlwYFBY3o1M2k6Qop4M2TtkJVjJhlchMVzQXSX7Ep3aQzG2kYB008s7B2818");

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CheckoutForm = () => {
  const {clearCartItems} = useContext(CartContext)
  const auth = getAuth(firebaseApp);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { customerInfo, total, items } = location?.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:3001/payment", {
          id,
          amount: total,
          userId: user.uid,
          customerInfo,
          items,
        });

        console.log(data);
        elements.getElement(CardElement).clear();
        if (data.success) {
          toast.success(`Comanda a fost plasata cu succes!`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });

          // Redirect after 10 seconds
          setTimeout(() => {
            navigate("/shop");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-8">
      <CardElement options={CARD_OPTIONS} className="p-2 bg-gray-100 rounded" />
      <button
        onClick={clearCartItems}
        type="submit"
        className="w-full px-3 py-2 text-white bg-green-300 rounded mt-4 hover:bg-red-300"
      >
        Pay
      </button>
    </form>
  );
};

const CheckoutApp = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default CheckoutApp;
