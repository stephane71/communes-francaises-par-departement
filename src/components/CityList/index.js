import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function CityList({ cityList }) {
  return (
    <List>
      {cityList.map(city => (
        <ListItem key={city.code} button>
          <ListItemText
            primary={city.nom}
            secondary={new Intl.NumberFormat("fr-FR").format(city.code)}
          />
          <span>{new Intl.NumberFormat("fr-FR").format(city.population)}</span>
        </ListItem>
      ))}
    </List>
  );
}

CityList.propTypes = {
  cityList: PropTypes.array
};

export default CityList;
