import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import FiguresList from './FiguresList';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
    minHeight: '100vh',
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <FiguresList />
    </div>
  );
};

export default LandingPage;
