import React, { useState } from "react";

const SelectBox = ({ options, onSelectChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = event => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelectChange(value);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
