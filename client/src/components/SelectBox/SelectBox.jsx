import React, { useState, useId } from "react";
import './SelectBox.css';

const SelectBox = ({ options, onSelectChange, selectLabel }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const selID = useId();

  const handleSelectChange = event => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelectChange(value);
  };

  return (
    <>
    <label htmlFor={selID}>{selectLabel}</label>
    <select id={selID} name={selID} value={selectedValue} onChange={handleSelectChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    </>
  );
};

export default SelectBox;
