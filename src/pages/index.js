import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import departmentList from "../../public/departments.json";
import DepartmentSelector from "../components/DepartmentSelector";
import PopulationSelector from "src/components/PopulationSelector";

const DEFAULT_DEPARTMENT = departmentList.find(({ code }) => code === "78");
const DEFAULT_POPULATION = 20000;

const useStyles = makeStyles(theme => ({
  index: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2)
  },

  form: {
    display: "flex",
    alignItems: "center"
  },

  formDepartment: {
    marginRight: theme.spacing(2)
  },

  results: {
    flexGrow: 1
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
          setTimeout(() => setLoading(false), 2000);
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

        <div className={classes.results}>
          {loading && <div>Chargement...</div>}
          {!loading && !filteredCities.length && <div>Pas de résultats</div>}
          {!loading &&
            filteredCities.map(({ nom, code, population }) => (
              <div key={code}>{`${code} - ${nom}: ${population}`}</div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default Index;
