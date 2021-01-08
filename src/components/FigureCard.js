import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Rectangle, Circle, Ellipse, Line, Triangle } from 'react-shapes';

/* 
This component display a geometrical figure, the name of it and an option to delete the figure
*/

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  contentGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  shape: {
    margin: '2em 0',
    [theme.breakpoints.up('sm')]: {
      margin: '0',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  selectable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  text: {
    maxWidth: '90%',
    textAlign: 'justify',
    margin: '4rem 0rem',
    fontSize: '5vw',
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

const FigureCard = ({ item, type, handleDelete, handleOpen }) => {
  const classes = useStyles();

  /* 
  According to the data of a figure this function will return a component that suits the criteria 
 */
  const renderLibShapes = () => {
    switch (item.type) {
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
      <Grid className={classes.contentGrid} item xs={6}>
        {/* Geometrical figure section */}
        <CardMedia
          className={classes.selectable}
          onClick={item.name !== 'no results found' ? handleOpen : null}
        >
          <div className={classes.shape}>
            {type === 'Image Based' ? (
              <img src={item.imgUrl} height={item.height} alt={item.name} />
            ) : type === 'CSS Based' ? (
              <div style={item.style} />
            ) : (
              renderLibShapes()
            )}
          </div>
        </CardMedia>
      </Grid>
      <Grid className={classes.contentGrid} item xs={6}>
        <CardContent className={classes.content}>
          {/* Name figure section */}
          <div
            className={
              item.name !== 'no results found' ? classes.selectable : null
            }
          >
            <h1
              onClick={item.name !== 'no results found' ? handleOpen : null}
              className={classes.text}
            >
              {item.name}
            </h1>
          </div>
          {/* Delete figure button */}
          {item.name !== 'no results found' ? (
            <IconButton
              style={{ zIndex: 2, padding: '0' }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          ) : null}
        </CardContent>
      </Grid>
    </Card>
  );
};

export default FigureCard;
