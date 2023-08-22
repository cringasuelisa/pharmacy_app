import React, { useState, useEffect } from 'react';
import MedicamentCard from '../Components/MedicamentCard';
import SearchBox from '../Components/SearchBox';

const Shop = () => {
  const [medicamente, setMedicamente] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/medicament/')
      .then((response) => response.json())
      .then((data) => {
        setMedicamente(data);
      });
  }, []);

  useEffect(() => {
    const filteredMedicamente = medicamente.filter((med) => {
      const keywords = med.keywords.toLowerCase().split(', ');
      return (
        med.denumire.toLowerCase().includes(searchQuery.toLowerCase()) ||
        keywords.some((keyword) => keyword.includes(searchQuery.toLowerCase()))
      );
    });
    setSearchResults(filteredMedicamente);
  }, [medicamente, searchQuery]);

  return (
    <div>
      <SearchBox setSearchQuery={setSearchQuery} />
      <div className="flex flex-wrap justify-center">
        {searchResults.map((med) => (
          <MedicamentCard key={med.denumire} med={med} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
