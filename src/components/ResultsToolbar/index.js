import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CircularProgress from "@material-ui/core/CircularProgress";

import SortSelector from "src/components/SortSelector";

const useStyles = makeStyles(theme => ({
  resultsToolbar: {
    display: "flex",
    alignItems: "center"
  },

  resultsToolbarSortActions: {
    display: "flex",
    alignItems: "flex-end",
    marginLeft: theme.spacing(3)
  }
}));

function ResultsToolbar({
  loading,
  results,
  values,
  onChangeOrder,
  onChangeSort
}) {
  const classes = useStyles();
  const { filtered, all } = results;
  const { sortBy, order } = values;

  return (
    <div className={classes.resultsToolbar}>
      {loading ? (
        <CircularProgress size={25} />
      ) : (
        <span>
          {filtered} / {all} communes
        </span>
      )}
      <div className={classes.resultsToolbarSortActions}>
        <SortSelector value={sortBy} onChange={onChangeSort} />
        <IconButton onClick={onChangeOrder} size="small">
          {order === 1 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>
      </div>
    </div>
  );
}

ResultsToolbar.propTypes = {
  loading: PropTypes.bool,
  results: PropTypes.exact({
    filtered: PropTypes.number,
    all: PropTypes.number
  }),
  values: PropTypes.exact({
    sortBy: PropTypes.string,
    order: PropTypes.number
  }),
  onChangeSort: PropTypes.func,
  onChangeOrder: PropTypes.func
};

export default ResultsToolbar;
