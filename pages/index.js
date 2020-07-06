import { useState, useEffect } from "react";
import Head from "next/head";
import departmentList from "../public/departments.json";

const DEFAULT_DEPARTMENT = departmentList.find(({ code }) => code === "78");
const DEFAULT_POPULATION = 20000;

export default function Home() {
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
            setFilteredCities(data.filter(city => city.population >= population));
            setTimeout(() => setLoading(false), 2000);
          });
    }
  }, [selectedDepartment]);

  function handleChangeDepartment(event) {
    const dep = departmentList.find(({ code }) => code === event.target.value);
    setSelectedDepartment(dep);
  }

  function handleChangePopulation(event) {
    if (!event.target.value) {
      return;
    }
    setPopulation(Number.parseInt(event.target.value));
  }

  function handleClickValidation() {
    setFilteredCities(cities.filter(city => city.population >= population));
  }

  return (
      <div className="container">
        <Head>
          <title>Les communes francaises</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <header>
            <h1 className="title">Les communes françaises</h1>
            <p className="description">
              Rechercher la liste des communes par département selon leur
              population
            </p>
          </header>

          <div className="search">
            <div className="form">
              <select
                  className="department"
                  onChange={handleChangeDepartment}
                  value={selectedDepartment?.code}
              >
                <option value="">Choississez un departement</option>
                {departmentList.map(dep => (
                    <option value={dep.code} key={dep.code}>
                      {dep.code} - {dep.nom}
                    </option>
                ))}
              </select>
              <div className="population">
                <input
                    type="number"
                    placeholder="population supérieur à"
                    value={population}
                    onChange={handleChangePopulation}
                    min={0}
                />
                <button onClick={handleClickValidation}>Valider</button>
              </div>
            </div>
          </div>
          <div className="results">
            {loading && <div>Chargement...</div>}
            {!loading && !filteredCities.length && <div>Pas de résultats</div>}
            {filteredCities.map(({ nom, code, population }) => (
                <div key={code}>{`${code} - ${nom}: ${population}`}</div>
            ))}
          </div>
        </main>

        <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px;
        }

        .results {
          flex-grow: 1;
        }

        .form > .department,
        .form > .population > input,
        .form > .population > button {
          padding: 4px;
        }

        .department {
          margin-bottom: 16px;
        }

        .population > input {
          margin-right: 16px;
        }

        .population {
          display: block;
          margin-bottom: 16px;
        }
      `}</style>

        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      </div>
  );
}
