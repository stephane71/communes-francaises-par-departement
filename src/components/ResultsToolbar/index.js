import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import SortIcon from "@material-ui/icons/Sort";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

const useStyles = makeStyles(theme => ({
  resultsToolbar: {
    display: "flex",
    alignItems: "center"
  },

  resultsToolbarSortActions: {
    marginLeft: theme.spacing(3)
  }
}));

function ResultsToolbar({ loading, results, onClickSort, onClickSortAlpha }) {
  const classes = useStyles();
  const { filtered, all } = results;

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
        <IconButton
          aria-label="Trie par population"
          onClick={onClickSort}
          disabled
        >
          <SortIcon />
        </IconButton>
        <IconButton
          aria-label="Trie alphabétique"
          onClick={onClickSortAlpha}
          disabled
        >
          <SortByAlphaIcon />
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
  onClickSort: PropTypes.func,
  onClickSortAlpha: PropTypes.func
};

export default ResultsToolbar;
