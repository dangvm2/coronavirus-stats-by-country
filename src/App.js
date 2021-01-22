import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import theme from "./theme";
import Overview from "./pages/Overview";
import DataTable from "./pages/DataTable";
import { Copyright } from "./components/Copyright";
import { getSummary } from "./redux/actions/statsAction";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  navButton: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5em",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const App = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    getSummary().then((data) => {
      dispatch(data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Coronavirus Disease (COVID-19) Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.appBarSpacer} />

      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.navButton}>
          <Button
            variant={location.pathname === "/" ? "contained" : "outlined"}
            size="large"
            color="primary"
            onClick={() => history.push("/")}
          >
            Overview
          </Button>
          <Button
            variant={location.pathname === "/table" ? "contained" : "outlined"}
            size="large"
            color="primary"
            onClick={() => history.push("/table")}
          >
            Data Table
          </Button>
        </div>
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route path="/table" component={DataTable} />
        </Switch>
      </Container>

      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </ThemeProvider>
  );
};

export default App;
