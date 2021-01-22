/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const SearchBox = (props) => {
  const handleFilterChanged = (valueChanged) => {
    let arrFilter = valueChanged.map((item) => item.CountryCode);
    props.setArrCountryFilter(arrFilter);
  };

  return (
    <Autocomplete
      multiple
      id="txtSearchCountry"
      options={props.listCountry}
      disableCloseOnSelect
      onChange={(event, value, reason) => handleFilterChanged(value)}
      getOptionLabel={(option) => option.Country}
      filterSelectedOptions
      style={{ width: "full" }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search by Country"
        />
      )}
    />
  );
};
