import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import SortIcon from "@material-ui/icons/Sort";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

import departmentList from "../../public/departments.json";
import DepartmentSelector from "src/components/DepartmentSelector";
import PopulationSelector from "src/components/PopulationSelector";
import CityList from "src/components/CityList";

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
    flexDirection: "column",
    padding: theme.spacing(2)
  },

  toolbar: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between"
  },

  form: {
    display: "flex",
    alignItems: "center"
  },

  formDepartment: {
    marginRight: theme.spacing(2)
  },

  results: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },

  resultList: {
    flexGrow: 1,
    height: "100%",
    overflow: "auto"
  },

  resultsToolbar: {
    display: "flex",
    alignItems: "center"
  },

  resultsToolbarSortActions: {
    marginLeft: theme.spacing(3)
  },

  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5)
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
    setFilteredCities(cities.filter(city => city.population >= population));
  }, [population, cities]);

  function handleChangeDepartment(event, value) {
    setSelectedDepartment(value);
  }

  function handleChangePopulation(event) {
    const value = event.target.value ? Number.parseInt(event.target.value) : "";
    setPopulation(value);
  }

  function handleSortByPopulation() {}

  function handleSortByName() {}

  return (
    <div className={classes.index}>
      <Head>
        <title>Les communes françaises</title>
      </Head>

      <main className={classes.main}>
        <header>
          <Typography gutterBottom variant="h4" component="h1">
            Les communes françaises
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Rechercher la liste des communes par département selon leur
            population
          </Typography>
        </header>

        <Divider className={classes.divider} />

        <div className={classes.toolbar}>
          <div className={classes.form}>
            <div className={classes.formDepartment}>
              <DepartmentSelector
                value={selectedDepartment}
                onChange={handleChangeDepartment}
              />
            </div>
            <PopulationSelector
              value={population}
              onChange={handleChangePopulation}
            />
          </div>
          <div className={classes.resultsToolbar}>
            {loading ? (
              <CircularProgress size={25} />
            ) : (
              <span>{filteredCities.length} résultats</span>
            )}
            <div className={classes.resultsToolbarSortActions}>
              <IconButton
                aria-label="Trie par population"
                onClick={handleSortByPopulation}
                disabled
              >
                <SortIcon />
              </IconButton>
              <IconButton
                aria-label="Trie alphabetique"
                onClick={handleSortByName}
                disabled
              >
                <SortByAlphaIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <div className={classes.resultList}>
          {!loading && !filteredCities.length && <div>Pas de résultats</div>}
          {<CityList cityList={filteredCities} />}
        </div>
      </main>
    </div>
  );
}

export default Index;
