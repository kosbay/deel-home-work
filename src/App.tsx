import { useState } from "react";

import AutoComplete from "./components/AutoComplete/AutoComplete";
import { API_URL, API_KEY } from "./constants";

import "./App.css";

interface Animal {
  name: string;
  locations: string[];
}

const searchAnimals = (
  query: string,
  setResults: (value: Animal[]) => void,
  setIsLoading: (value: boolean) => void
) => {
    fetch(
      `${API_URL}/animals?name=${query}`, {
      headers: { 'X-Api-Key': API_KEY}
    })
    .then((response) => response.json())
    .then((data: Animal[]) => {
      setIsLoading(false);
      setResults(data ? data.map(({ name, locations }) => ({ name, locations })) : []);
    });
};

function App() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  return (
    <>
      <h1>Discover animals</h1>
      <AutoComplete<Animal>
        searchQuery={searchAnimals}
        onResultClick={(item) => setSelectedAnimal(item)}
        placeholder="Search for an animal"
      />
      <div className="selected-animal">
        {selectedAnimal ? (
          <>
            <h2>{selectedAnimal.name}</h2>
            <p>Locations: {selectedAnimal.locations.join(', ')}</p>
          </>
        ) : (
          <p>No animal selected</p>
        )}
      </div>
    </>
  )
}

export default App
