import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { Rectangle, Circle, Ellipse, Line, Triangle } from 'react-shapes';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
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

const FigureCard = ({ item, type }) => {
  const classes = useStyles();

  const renderShape = () => {
    switch (item.name) {
      case 'Rectangle':
        return (
          <Rectangle
            width={item.width}
            height={item.height}
            fill={{ color: item.color }}
            stroke={{ color: '#eee' }}
            strokeWidth={0}
          />
        );
      case 'Circle':
        return (
          <Circle
            r={item.width}
            fill={{ color: item.color }}
            stroke={{ color: '#E65243' }}
            strokeWidth={0}
          />
        );
      case 'Triangle':
        return (
          <Triangle
            width={item.width}
            height={item.height}
            fill={{ color: item.color }}
            stroke={{ color: '#E65243' }}
            strokeWidth={0}
          />
        );
      case 'Ellipse':
        return (
          <Ellipse
            rx={item.width}
            ry={item.height}
            fill={{ color: item.color }}
            stroke={{ color: '#eee' }}
            strokeWidth={0}
          />
        );
      case 'Line':
        return (
          <Line
            x1={item.height}
            x2={item.width}
            y1={item.height}
            y2={item.width}
            stroke={{ color: item.color }}
            strokeWidth={3}
          />
        );
      case 'Square':
        return (
          <Rectangle
            width={item.width}
            height={item.height}
            fill={{ color: item.color }}
            stroke={{ color: '#eee' }}
            strokeWidth={0}
          />
        );
      default:
        return <h1>Not supported!</h1>;
    }
  };

  return (
    <Card className={classes.cardContainer}>
      <Grid className={classes.content} item xs={6}>
        <CardMedia>
          {type === 'Image Based' ? (
            <img src={item.imgUrl} height={item.height} alt={item.name} />
          ) : type === 'CSS Based' ? (
            <div style={item.style} />
          ) : type === 'External Library Based' ? (
            renderShape()
          ) : null}
        </CardMedia>
      </Grid>
      <Grid className={classes.content} item xs={6}>
        <CardContent className={classes.content}>
          <h1 className={classes.text}>{item.name}</h1>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default FigureCard;
