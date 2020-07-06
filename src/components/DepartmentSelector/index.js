import React from "react";
import PropType from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import departmentList from "public/departments.json";

function DepartmentSelector({ value, onChange }) {
  return (
    <Autocomplete
      id="department-autocomplete"
      value={value}
      onChange={onChange}
      style={{ width: 300 }}
      options={departmentList}
      autoHighlight
      disableClearable
      size="small"
      getOptionLabel={option => option.nom}
      renderOption={option => (
        <React.Fragment>
          <span>{option.code}</span> - {option.nom}
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
