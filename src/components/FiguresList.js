import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FigureCard from './FigureCard';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}));

const FiguresList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FigureCard />
      <FigureCard />
    </div>
  );
};

export default FiguresList;
