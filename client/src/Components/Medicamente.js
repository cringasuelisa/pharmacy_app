import React from "react";
import { useState, useEffect } from "react";
import MedicamentCard from "./MedicamentCard";

const Medicamente = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/medicament/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((med) => (
        <MedicamentCard med={med} />
      ))}
    </div>
  );
};

export default Medicamente;
