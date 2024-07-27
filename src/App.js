import React, { useState } from "react";
import CustomSelect from "./components/CustomSelect.jsx";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  //for testing purposes
  const options = [
    { value: "Apple", label: "Apple" },
    { value: "Banana", label: "Banana" },
    { value: "Orange", label: "Orange" },
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
    console.log("Selected Option:", option);
  };

  return (
    <div className="App">
      <h1 className="kzui-select__heading">Custom Select Component</h1>
      <div className="kzui-select__main">
        <br />
        <CustomSelect
          isClearable={true}
          isSearchable={true}
          isDisabled={false}
          options={options}
          value={selectedOption}
          placeholder="Select an option..."
          isGrouped={false}
          isMulti={false}
          onChangeHandler={handleChange}
          onMenuOpen={() => console.log("Menu opened")}
          onSearchHandler={(text) => console.log("Search text:", text)}
        />
      </div>
    </div>
  );
};

export default App;
