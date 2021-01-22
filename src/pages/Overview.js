import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import { formatNumber, formatDate } from "../helpers/commonFunc";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    height: 200,
  },
  textOverview: {
    textAlign: "center",
    paddingBottom: theme.spacing(4),
  },
  textBlue: {
    color: "#2196f3",
  },
  textOrange: {
    color: "#ff9800",
  },
}));

function compare(a, b) {
  if (a.NewConfirmed < b.NewConfirmed) {
    return 1;
  }
  if (a.NewConfirmed > b.NewConfirmed) {
    return -1;
  }
  return 0;
}

export default function Overview() {
  const classes = useStyles();

  const globalSummary = useSelector((state) => state.stats.globalSummary);
  const date = useSelector((state) => state.stats.date);
  const listCountrySummary = useSelector(
    (state) => state.stats.listCountrySummary
  );

  return (
    <div>
      <Typography variant="h4" className={classes.textOverview}>
        <span className={classes.textBlue}>Globally</span>
        {", as of"}
        <span className={classes.textBlue}>{formatDate(date)}</span>
        {", there have been "}
        <span className={classes.textBlue}>
          {globalSummary.NewConfirmed}
          {" confirmed cases"}
        </span>
        {" of COVID-19, including "}
        <span className={classes.textOrange}>
          {globalSummary.NewDeaths}
          {" deaths"}
        </span>
        .
      </Typography>
      <Typography variant="h6">
        Top countries with new confirmed covid cases
      </Typography>
      <Grid container className={classes.container} spacing={3}>
        {listCountrySummary.length > 0 &&
          listCountrySummary
            .sort(compare)
            .slice(0, 8)
            .map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Paper className={classes.paper}>
                    <Title
                      countryCode={item.CountryCode}
                      text={item.Country}
                      statNumber={formatNumber(item.NewConfirmed)}
                      type={"confirmed cases"}
                    />
                  </Paper>
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
}
