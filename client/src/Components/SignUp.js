import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import firebaseApp from "../firebaseConfig";

function SignUp() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // initialised auth instance
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let email = input.email.toLowerCase().trim();
    let password = input.password;

    // creating a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setError("The password is too weak.");
        } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
          setError("Exista deja un cont asociat adesei de email!");
        } else {
          console.log(err.code);
          alert(err.code);
        }
      });
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {error && (
          <p className="text-red-500 text-center text-lg mt-10">{error}</p>
        )}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-green-200 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
              Creeaza un cont
            </h1>
            <form className="space-y-4 md:space-y-6" action={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black dark:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  className="bg-green-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black dark:text-black"
                >
                  Parola
                </label>
                <input
                  type="password"
                  value={input.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-green-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-black bg-primary-600 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-green-200 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Creeaza contul
              </button>
              <p className="text-sm font-light text-gray-700 dark:text-gray-600">
                Ai deja un cont? <Link to="/login">Intra in cont!</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
