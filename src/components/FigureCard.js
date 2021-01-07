import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {},
  text: {
    maxWidth: '90%',
    textAlign: 'justify',
    margin: '4rem 0rem',
    fontSize: '4vw',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
      fontSize: '3vw',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
      fontSize: '2vw',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
      fontSize: '1.5vw',
    },
  },
}));

const FigureCard = () => {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.text}>Stuff List</h1>
    </div>
  );
};

export default FigureCard;
