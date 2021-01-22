import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import Box from "@material-ui/core/Box";
import { formatNumber } from "../helpers/commonFunc";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: "Country",
      numeric: false,
      disablePadding: true,
      label: "Country Name",
      globalRowLabel: "Global",
    },
    {
      id: "NewConfirmed",
      numeric: true,
      disablePadding: false,
      label: "New Confirmed",
      globalRowLabel: formatNumber(props.globalSummary.NewConfirmed),
      isHighline: true,
    },
    {
      id: "TotalConfirmed",
      numeric: true,
      disablePadding: false,
      label: "Total Confirmed",
      globalRowLabel: formatNumber(props.globalSummary.TotalConfirmed),
    },
    {
      id: "NewDeaths",
      numeric: true,
      disablePadding: false,
      label: "New Deaths",
      globalRowLabel: formatNumber(props.globalSummary.NewDeaths),
    },
    {
      id: "TotalDeaths",
      numeric: true,
      disablePadding: false,
      label: "Total Deaths",
      globalRowLabel: formatNumber(props.globalSummary.TotalDeaths),
    },
    {
      id: "NewRecovered",
      numeric: true,
      disablePadding: false,
      label: "New Recovered",
      globalRowLabel: formatNumber(props.globalSummary.NewRecovered),
    },
    {
      id: "TotalRecovered",
      numeric: true,
      disablePadding: false,
      label: "Total Recovered",
      globalRowLabel: formatNumber(props.globalSummary.TotalRecovered),
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            padding={"none"}
            style={{ background: "#FFFFFF" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={classes.tableHeader}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
            <div
              className={classes.globalRow}
              style={headCell.isHighline && { color: "#2196f3" }}
            >
              {headCell.globalRowLabel}
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  globalSummary: PropTypes.object.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Situation by Country
      </Typography>
      <Tooltip title="Dense off">
        <IconButton
          aria-label="dense off"
          color={!props.dense ? "secondary" : ""}
          onClick={() => props.setDense(false)}
        >
          <ViewListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dense on">
        <IconButton
          aria-label="dense on"
          color={props.dense ? "secondary" : ""}
          onClick={() => props.setDense(true)}
        >
          <ViewHeadlineIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  container: {
    maxHeight: 700,
  },
  table: {
    minWidth: 750,
  },
  tableHeader: {
    padding: theme.spacing(2),
    height: "5em",
    fontWeight: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  globalRow: {
    borderTop: "1px solid #e0e0e0",
    padding: theme.spacing(2),
    height: "4em",
    fontWeight: 600,
  },
  imgFlag: {
    marginRight: theme.spacing(1),
  },
}));

export default function SearchResult(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("NewConfirmed");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.listCountry.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <EnhancedTableToolbar dense={dense} setDense={setDense} />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.listCountry.length}
              globalSummary={props.globalSummary}
            />
            <TableBody>
              {stableSort(props.listCountry, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `table-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        <Box display="flex" alignItems="center">
                          <img
                            src={`${process.env.REACT_APP_COUNTRY_FLAG}${row.CountryCode}/flat/32.png`}
                            alt="flag"
                            className={classes.imgFlag}
                          />
                          {row.Country}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {formatNumber(row.NewConfirmed)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumber(row.TotalConfirmed)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumber(row.NewDeaths)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumber(row.TotalDeaths)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumber(row.NewRecovered)}
                      </TableCell>
                      <TableCell align="right">
                        {formatNumber(row.TotalRecovered)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.listCountry.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
