//homepage.tsx

import { useEffect, useState } from "react";
import { getAllBreeds } from "../../api/dogApi";
import BreedCard from "../breedcard/BreedCard";
import "./homepage.scss";

const HomePage = () => {
  //const navigate = useNavigate();
  const [breeds, setBreeds] = useState<string[]>([]); // Update the type of breeds to string[]
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);

  const handelGetAllBreeds = async () => {
    try {
      const data = await getAllBreeds();
      const dogArr = Object.keys(data.message);
      console.log(dogArr)
      setFilteredBreeds(dogArr);
      setBreeds(dogArr);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handelGetAllBreeds();
  }, []);

  const handleSearch = (searchTerm: string) => {
    // Filter breeds based on the search term
    const filtered = breeds.filter((breed) =>
      breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBreeds(filtered);
  };

  return (
    <div>
    <h1>Home Page</h1>
    <div>
        <label htmlFor="search">Search Breeds:</label>
        <input
          type="text"
          id="search"
          placeholder="Enter breed name"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    <div className="breed-card-gallery">
      {filteredBreeds.map((breed) => (
        <BreedCard key={breed} breed={breed} />
      ))}
    </div>
  </div>
  );
};

export default HomePage;
