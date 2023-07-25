import React, { useEffect, useState, useRef } from "react";

import Input from "../Input/Input";
import AutoCompleteListBox from "./components/AutoCompleteListBox/AutoCompleteListBox";
import useDebounce from "../../hooks/useDebounce";
import { DEBOUNCE } from "../../constants";

import styles from "./AutoComplete.module.scss";

interface SearchQueryType<T> {
  (query: string, setResults: (value: T[]) => void, setIsLoading: (value: boolean) => void): void;
}

interface AutoCompleteProps<T> {
  searchQuery: SearchQueryType<T>;
  onResultClick?: (item: T) => void;
  placeholder?: string;
}

const AutoComplete = <T extends { name: string }>({
  onResultClick, searchQuery, placeholder
}: AutoCompleteProps<T>) => {
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const [showListBox, setShowListBox] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedSearch = useDebounce<SearchQueryType<T>>(searchQuery, DEBOUNCE);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    const autocompleteNode = autocompleteRef.current as Node;

    const targetNode = event.target as Node;

    if (autocompleteNode && !autocompleteNode.contains(targetNode)) {
      setShowListBox(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
    
  const handleSearch = (value: string) => {
    setSearchValue(value);
    const search = debouncedSearch;
    if (!value) {
      setResults([]);
      setIsLoading(false);
    } else {
      setShowListBox(true);
      setIsLoading(true);
      search(value, setResults, setIsLoading);
    }
  };

  const handleResultClick = (item: T) => {
    setSearchValue(item.name)
    setShowListBox(false);
    onResultClick?.(item);
  };

  return (
    <div ref={autocompleteRef} className={styles.autoComplete}>
      <Input
        onSearch={handleSearch}
        onChange={handleChange}
        value={searchValue}
        placeholder={placeholder}
      />
      {showListBox && (
        <AutoCompleteListBox<T>
          items={results}
          onSelect={handleResultClick}
          isLoading={isLoading}
          searchValue={searchValue}
        />
      )}
    </div>
  );
};

export default AutoComplete;