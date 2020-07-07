import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { CITY_NAME_ATTRIBUTE, CITY_POPULATION_ATTRIBUTE } from "src/enums";

function CityList({ cityList }) {
  if (!cityList.length) {
    return <div>Pas de résultats</div>;
  }

  return (
    <List dense>
      {cityList.map(city => (
        <ListItem key={city.code} button>
          <ListItemText
            primary={city[CITY_NAME_ATTRIBUTE]}
            primaryTypographyProps={{ variant: "subtitle2" }}
            secondary={new Intl.NumberFormat("fr-FR").format(city.code)}
          />
          <span>
            {new Intl.NumberFormat("fr-FR").format(
              city[CITY_POPULATION_ATTRIBUTE]
            )}
          </span>
        </ListItem>
      ))}
    </List>
  );
}

CityList.propTypes = {
  cityList: PropTypes.array
};

export default CityList;
