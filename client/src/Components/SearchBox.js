import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); 
    setSearchQuery(query);
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <form
      className="flex items-center max-w-md shadow rounded border-3 p-3"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        className="bg-green-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-green-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="q"
        id="q"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        aria-label="Search Products"
      />
      <button type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
