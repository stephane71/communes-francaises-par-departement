import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import departmentList from "public/departments.json";
import DepartmentSelector from "src/components/DepartmentSelector";
import PopulationSelector from "src/components/PopulationSelector";
import CityList from "src/components/CityList";
import ResultsToolbar from "src/components/ResultsToolbar";

import getSortFunction from "src/utils/getSortFunction";
import { CITY_POPULATION_ATTRIBUTE, CITY_NAME_ATTRIBUTE } from "src/enums";

const DEFAULT_DEPARTMENT = departmentList.find(({ code }) => code === "78");
const DEFAULT_POPULATION = 20000;

const useStyles = makeStyles(theme => ({
  index: {
    minHeight: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },

  main: {
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    paddingTop: theme.spacing(2)
  },

  results: {
    display: "flex",
    justifyContent: "flex-end"
  },

  resultList: {
    flexGrow: 1,
    height: "100%",
    overflow: "auto"
  }
}));

function Index() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [population, setPopulation] = useState(DEFAULT_POPULATION);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    DEFAULT_DEPARTMENT
  );
  const [sortBy, setSortBy] = useState(CITY_NAME_ATTRIBUTE);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (selectedDepartment && selectedDepartment.code) {
      setLoading(true);
      fetch(
        `https://geo.api.gouv.fr/departements/${selectedDepartment.code}/communes`
      )
        .then(data => data.json())
        .then(data => {
          setCities(data);
          setTimeout(() => setLoading(false), 1200);
        });
    }
  }, [selectedDepartment]);

  useEffect(() => {
    setFilteredCities(
      cities
        .filter(city => city[CITY_POPULATION_ATTRIBUTE] >= population)
        .sort(getSortFunction(sortBy, order))
    );
  }, [population, cities]);

  function handleChangeDepartment(event, value) {
    setSelectedDepartment(value);
  }

  function handleChangePopulation(event) {
    const value = event.target.value ? Number.parseInt(event.target.value) : "";
    setPopulation(value);
  }

  function handleChangeSort(type) {
    const sortedCities = filteredCities.sort(getSortFunction(type, order));
    setSortBy(type);
    setFilteredCities(sortedCities);
  }

  function handleChangeOrder() {
    const orderedCities = filteredCities.reverse();
    setOrder(order === 1 ? -1 : 1);
    setFilteredCities(orderedCities);
  }

  return (
    <Container maxWidth="md" className={classes.index}>
      <main className={classes.main}>
        <header className={classes.header}>
          <Typography gutterBottom variant="h4" component="h1">
            Les Communes
          </Typography>
        </header>

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <DepartmentSelector
                  value={selectedDepartment}
                  onChange={handleChangeDepartment}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <PopulationSelector
                  value={population}
                  onChange={handleChangePopulation}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} className={classes.results}>
            <ResultsToolbar
              loading={loading}
              results={{ filtered: filteredCities.length, all: cities.length }}
              values={{ sortBy, order }}
              onChangeSort={handleChangeSort}
              onChangeOrder={handleChangeOrder}
            />
          </Grid>
        </Grid>

        <div className={classes.resultList}>
          <CityList cityList={filteredCities} />
        </div>
      </main>
    </Container>
  );
}

export default Index;
