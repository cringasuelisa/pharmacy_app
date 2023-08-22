import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import ItemCart from "../Components/ItemCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, clearCartItems } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let subT = 0;
    cartItems?.forEach((item) => {
      subT += item.cantitate * item.pret;
    });
    setSubtotal(parseFloat(subT.toFixed(2)));
  }, [cartItems]);

  const [customerInfo, setCustomerInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    state: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    setCustomerInfo({
      ...customerInfo,
      [event.target.id]: event.target.value,
    });
  };

  const handleFinalizeClick = () => {
    navigate("/checkout", {
      state: { customerInfo, total: subtotal, items: cartItems },
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/5 pr-10">
        <h2 className="text-2xl font-semibold text-black my-16 text-center">
          Coșul tău de cumpărături
        </h2>
        {cartItems.length === 0 ? (
          <div>
            <p className="text-4xl font-bold text-black mt-32 mb-48 text-center">
              Coșul de cumpărături este gol.
            </p>
            <div className="text-black mb-20 text-center text-lg">
              <Link to="/shop">Inapoi la farmacie</Link>
            </div>
          </div>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <ItemCart item={item} key={index} />
            ))}
          </div>
        )}
      </div>

      <div className="w-2/5 pl-10">
        <div className="bg-white py-12 md:py-24">
          <div className="mx-auto max-w-lg">
            <form className="gap-6">
              {cartItems.length > 0 && (
                <div>
                  <h1 className="text-center text-lg font-semibold text-black mb-10">
                    Adresa de livrare
                  </h1>

                  <div className="col-span-3">
                    <label
                      htmlFor="nume"
                      className="block text-base font-medium text-gray-700"
                    >
                      Nume
                    </label>

                    <input
                      type="text"
                      id="first_name"
                      value={customerInfo.first_name}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="prenume"
                      className="block text-base font-medium text-gray-700"
                    >
                      Prenume
                    </label>

                    <input
                      type="text"
                      id="last_name"
                      value={customerInfo.last_name}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="judet"
                      className="block text-base font-medium text-gray-700"
                    >
                      Judet
                    </label>

                    <input
                      type="text"
                      id="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="localitate"
                      className="block text-base font-medium text-gray-700"
                    >
                      Localitate
                    </label>

                    <input
                      type="text"
                      id="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="Adresa"
                      className="block text-base font-medium text-gray-700"
                    >
                      Adresa
                    </label>

                    <input
                      type="text"
                      id="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="Phone"
                      className="block text-base font-medium text-gray-700"
                    >
                      Telefon
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}
              {cartItems.length > 0 && (
                <div className="text-center">
                  <div className="text-base font-semibold mt-6 mb-10 border border-solid border-b-2">
                    Taxa de livrare: {subtotal > 150 ? "0 RON" : "25 RON"}
                  </div>
                  <div className="text-lg font-semibold mt-6 mb-10 border border-solid border-b-2">
                    Subtotal: {subtotal > 150 ? subtotal : subtotal + 25} RON
                  </div>
                  <div>
                    <button
                      className="bg-green-200 text-black py-3 px-6 active:bg-green-400 hover:bg-green-300 rounded-lg mb-10 w-64"
                      onClick={clearCartItems}
                    >
                      Golește coșul
                    </button>{" "}
                  </div>
                  <div>
                    <button
                      onClick={handleFinalizeClick}
                      className="bg-green-200 text-black py-3 px-6 active:bg-green-400 hover:bg-green-300 rounded-lg mb-10 w-64"
                    >
                      {" "}
                      Finalizează comanda
                    </button>{" "}
                  </div>
                </div>
              )}
            </form>
            {cartItems.length ===0 && ( 
            <div> 
                <img className="h-80 w-94"
                 src="https://cdn.pixabay.com/photo/2017/01/31/19/01/chemist-2026442_1280.png" alt="imagineFarm"/>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
