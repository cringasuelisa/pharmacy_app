import React, { useState } from "react";
import { ImGithub } from "react-icons/im";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {

  return (
    <div className="bg-green-200 text-black py-20 font-serif ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2">
        <div className="w-3/5 pr-10"> 
          {/* <img className="w-16" src={logo_2} alt="logo" /> */}
          <p className="text-xl font-semibold text-black mb-4">
            EC-Pharmacy
          </p>
          <div className="flex flex-row mt-5">
            <img
              className="w-16"
              src="https://cdn.iconscout.com/icon/free/png-512/free-visa-3-226460.png?f=avif&w=256"
              alt="paymentLogo"
            />
            <img
              className="w-16"
              src="https://cdn.iconscout.com/icon/free/png-512/free-mastercard-25-675722.png?f=avif&w=256"
              alt="paymentLogo"
            />
            <img
              className="w-16"
              src="https://cdn.iconscout.com/icon/free/png-512/free-paypal-54-675727.png?f=avif&w=256"
              alt="paymentLogo"
            />
          </div>
          <div className="ml-2 flex gap-5 text-lg text-gray-700">
            <ImGithub className="hover:text-white duration-300 cursor-pointer w-16" />
            <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer w-16" />
          </div>
        </div>
        <div className="text-right w-full">
          <h2 className="text-2xl font-semibold text-black mb-4">Contact</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Telefon: 0242525195</p>
            <p>E-mail: ecpharmacy@ecp.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
