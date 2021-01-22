import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imgFlag: {
    marginRight: theme.spacing(2),
  },
}));

export default function Title(props) {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box display="flex" alignItems="flex-start">
      <img
        src={`${process.env.REACT_APP_COUNTRY_FLAG}${props.countryCode}/flat/32.png`}
        alt="flag"
        className={classes.imgFlag}
      />
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.text}
      </Typography>
      </Box>
      <Typography variant="h4">{props.statNumber}</Typography>
      <Typography variant="subtitle1">{props.type}</Typography>
    </Box>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
