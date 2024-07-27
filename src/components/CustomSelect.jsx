import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CustomSelect.css";

const CustomSelect = ({
  isClearable = false,
  isSearchable = false,
  isDisabled = false,
  options = [],
  value = null,
  placeholder = "Select...",
  isGrouped = false,
  isMulti = false,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen && onMenuOpen) {
      onMenuOpen();
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (onSearchHandler) {
      onSearchHandler(e.target.value);
    }
  };

  const handleChange = (selectedOption) => {
    onChangeHandler(selectedOption);
    setMenuOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="kzui-select">
      <div
        className={`kzui-select__control ${
          isDisabled ? "kzui-select__control--disabled" : ""
        }`}
        onClick={!isDisabled ? handleToggleMenu : undefined}
      >
        <div className="kzui-select__value">
          {value ? (
            <span className="kzui-select__single-value">{value.label}</span>
          ) : (
            <span className="kzui-select__placeholder">{placeholder}</span>
          )}
        </div>
        <div className="kzui-select__indicators">
          {isClearable && value && (
            <span
              className="kzui-select__clear"
              onClick={() => handleChange(null)}
            >
              &#x2715;
            </span>
          )}
          <span
            className={`kzui-select__dropdown-indicator ${
              menuOpen ? "kzui-select__dropdown-indicator--open" : ""
            }`}
          >
            &#x25BC;
          </span>
        </div>
      </div>
      {menuOpen && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <input
              type="text"
              className="kzui-select__search-input"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
            />
          )}
          <div className="kzui-select__options">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`kzui-select__option ${
                  value && value.value === option.value
                    ? "kzui-select__option--selected"
                    : ""
                }`}
                onClick={() => handleChange(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  isGrouped: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func,
  onSearchHandler: PropTypes.func,
};

export default CustomSelect;
