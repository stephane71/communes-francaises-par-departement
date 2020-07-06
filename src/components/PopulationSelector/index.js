import React from "react";
import PropType from "prop-types";
import TextField from "@material-ui/core/TextField";

function PopulationSelector({ value, onChange }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label="Population supérieur à "
      variant="outlined"
      margin="dense"
      type="number"
      min={0}
    />
  );
}

PopulationSelector.propTypes = {
  onChange: PropType.func,
  value: PropType.any
};

export default PopulationSelector;
