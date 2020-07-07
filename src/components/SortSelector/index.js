import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { CITY_NAME_ATTRIBUTE, CITY_POPULATION_ATTRIBUTE } from "src/enums";

const useStyles = makeStyles(() => ({
  sortSelector: {
    minWidth: 130
  }
}));

function SortSelector({ value, onChange }) {
  const classes = useStyles();

  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <FormControl className={classes.sortSelector}>
      <Select value={value} onChange={handleChange}>
        <MenuItem value={CITY_POPULATION_ATTRIBUTE}>par population</MenuItem>
        <MenuItem value={CITY_NAME_ATTRIBUTE}>par nom</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortSelector;
