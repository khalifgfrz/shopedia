// components/filter/filter-wrapper.tsx

import React, { useState } from "react";
import { FilterSettings } from "./types";

interface FilterWrapperProps {
  onApplyFilters: (filters: FilterSettings) => void; // Define the filter props
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    product_name: "",
    selectedCategories: [] as string[], // Store selected categories
    sortBy: "",
  });

  // Hardcoded categories
  const categories = ["Men", "Women", "Shoes", "Electronics"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "selectedCategories") {
      setFilters((prev) => ({
        ...prev,
        selectedCategories: prev.selectedCategories.includes(value) ? prev.selectedCategories.filter((cat) => cat !== value) : [...prev.selectedCategories, value],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyFilter = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="filter-wrapper">
      <div className="mb-4">
        <label className="search-name text-sm mb-1" htmlFor="product_name">
          Search
        </label>
        <input className="h-10 rounded text-sm w-full text-black" type="text" id="product_name" name="product_name" placeholder="Search Your Product" autoComplete="off" value={filters.product_name} onChange={handleChange} />
      </div>
      <div className="text-sm">
        <h2 className="mb-4">Category</h2>
        {categories.map((category) => (
          <label key={category} className="checkbox">
            <input type="checkbox" name="selectedCategories" value={category} checked={filters.selectedCategories.includes(category)} onChange={handleChange} />
            {category}
          </label>
        ))}
      </div>
      {/* Add other filters like Sort By and Price Range as needed */}
      <button className="bg-primary mt-4 rounded text-black w-full h-8 text-sm hover:bg-darkprimary active:bg-darkprimary2" onClick={handleApplyFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterWrapper;
