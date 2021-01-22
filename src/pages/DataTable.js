import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SearchBox } from "../components/SearchBox";
import SearchResult from "../components/SearchResult";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function DataTable() {
  const classes = useStyles();

  const listCountrySummary = useSelector(
    (state) => state.stats.listCountrySummary
  );
  const globalSummary = useSelector((state) => state.stats.globalSummary);
  const [arrCountryFilter, setArrCountryFilter] = useState([]);
  const [listCountryFiltered, setlistCountryFiltered] = useState([]);

  useEffect(() => {
    if (arrCountryFilter.length === 0) {
      setlistCountryFiltered(listCountrySummary);
    } else {
      let lstFiltered = listCountrySummary.filter((item) =>
        arrCountryFilter.includes(item.CountryCode)
      );
      setlistCountryFiltered(lstFiltered);
    }
  }, [arrCountryFilter, listCountrySummary]);

  return (
    <Grid container spacing={3} className={classes.container}>
      {/* Search box */}
      <Grid item xs={12}>
        <SearchBox
          listCountry={listCountrySummary}
          arrCountryFilter={arrCountryFilter}
          setArrCountryFilter={setArrCountryFilter}
        />
      </Grid>
      {/* Grid Result */}
      <Grid item xs={12}>
        <SearchResult
          listCountry={listCountryFiltered}
          globalSummary={globalSummary}
        />
      </Grid>
    </Grid>
  );
}
