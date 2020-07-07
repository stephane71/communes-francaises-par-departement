import React from "react";
import PropType from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import departmentList from "public/departments.json";
import { CITY_NAME_ATTRIBUTE } from "../../enums";

function DepartmentSelector({ value, onChange }) {
  return (
    <Autocomplete
      id="department-autocomplete"
      value={value}
      onChange={onChange}
      style={{ minWidth: 200 }}
      options={departmentList}
      autoHighlight
      disableClearable
      size="small"
      getOptionLabel={option => option[CITY_NAME_ATTRIBUTE]}
      renderOption={option => (
        <React.Fragment>
          <span>{option.code}</span> - {option[CITY_NAME_ATTRIBUTE]}
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Choisissez un département"
          variant="outlined"
          margin="dense"
        />
      )}
    />
  );
}

DepartmentSelector.propTypes = {
  onChange: PropType.func,
  value: PropType.any
};

export default DepartmentSelector;
