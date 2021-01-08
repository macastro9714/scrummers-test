import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  OutlinedInput,
  InputAdornment,
  fade,
  Modal,
  Typography,
  Button,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { TwitterPicker } from 'react-color';
import { Rectangle, Circle, Ellipse, Line, Triangle } from 'react-shapes';

import FigureCard from './FigureCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    width: '80%',
  },
  gridItem: {
    width: '100%',
    margin: '0.1em 0',
  },
  searchBar: {
    position: 'relative',
    width: '80%',
    maxHeight: '4vh',
    minWidth: '80vw',
    backgroundColor: fade('#424242', 0.15),
    margin: '2em 0em',
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.3),
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '30vw',
      width: '25%',
    },
  },
  modal: {
    position: 'absolute',
    width: '60%',
    height: '70%',
    backgroundColor: theme.palette.primary.white,
    top: '15%',
    left: '20%',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  modalMain: {
    display: 'flex',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  modalOptions: {
    display: 'flex',
    width: '100%',
    height: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalForm: {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalInput: {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

const imgList = [
  {
    name: 'circle',
    imgUrl: 'https://i.imgur.com/FZhEn0h_d.webp?maxwidth=760&fidelity=grand',
    height: '150px',
  },
  {
    name: 'triangle',
    imgUrl: 'https://i.imgur.com/6nFxcIF_d.webp?maxwidth=760&fidelity=grand',
    height: '150px',
  },
  {
    name: 'square',
    imgUrl: 'https://i.imgur.com/fNmzs9s_d.webp?maxwidth=760&fidelity=grand',
    height: '150px',
  },
];

const cssList = [
  {
    name: 'circle',
    style: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: '#7986cb',
    },
  },
  {
    name: 'oval',
    style: {
      width: '200px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#7986cb',
    },
  },
  {
    name: 'square',
    style: {
      width: '120px',
      height: '120px',
      borderRadius: '0%',
      backgroundColor: '#7986cb',
    },
  },
  {
    name: 'rectangle',
    style: {
      width: '225px',
      height: '120px',
      borderRadius: '0%',
      backgroundColor: '#7986cb',
    },
  },
  {
    name: 'triangle',
    style: {
      width: 0,
      height: 0,
      borderLeftWidth: 75,
      borderRightWidth: 75,
      borderBottomWidth: 150,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#7986cb',
      borderTopStyle: 'hidden',
    },
  },
];

const libList = [
  {
    name: 'Rectangle',
    width: 220,
    height: 120,
    color: '#42a5f5',
  },
  {
    name: 'Circle',
    width: 70,
    height: 70,
    color: '#42a5f5',
  },
  {
    name: 'Ellipse',
    width: 100,
    height: 60,
    color: '#42a5f5',
  },
  {
    name: 'Line',
    width: 125,
    height: 25,
    color: '#42a5f5',
  },
  {
    name: 'Triangle',
    width: 110,
    height: 110,
    color: '#42a5f5',
  },
  {
    name: 'Square',
    width: 120,
    height: 120,
    color: '#42a5f5',
  },
];

const colorsOpt = [
  '#1de8b5',
  '#7986cb',
  '#ffca28',
  '#ef5350',
  '#42a5f5',
  '#eeeeee',
];

const FiguresList = ({ match }) => {
  const classes = useStyles();

  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [figures, setFigures] = useState([]);
  const [results, setResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedFigure, setSelectedFigure] = useState({});
  const [heightText, setHeightText] = useState('');
  const [widthText, setWidthText] = useState('');

  useEffect(() => {
    setType(match.params.type);
    if (figures.length > 0) setResults(figures);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    type === 'Image Based'
      ? setFigures([...imgList])
      : type === 'CSS Based'
      ? setFigures([...cssList])
      : type === 'External Library Based'
      ? setFigures([...libList])
      : setFigures([]);
  }, [type]);

  useEffect(() => {
    if (figures.length > 0) {
      const index = figures.map((e) => e.name).indexOf(selectedFigure.name);
      const updatedFigures = [...figures];
      if (index !== -1) updatedFigures[index] = selectedFigure;
      if (JSON.stringify(figures) !== JSON.stringify(updatedFigures)) {
        setFigures(updatedFigures);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFigure]);

  useEffect(() => {
    if (figures.length > 0) {
      if (results.length === 1) {
        const resultArray = figures.filter(
          (figure) => figure.name.toLowerCase() === text.toLowerCase()
        );
        text === ''
          ? setResults(figures)
          : setResults(
              resultArray.length > 0
                ? resultArray
                : [{ name: 'no results found' }]
            );
      } else if (results.length !== 1) setResults(figures);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figures]);

  const handleOpen = (item) => {
    setSelectedFigure(item);
    if (type === 'Imaged Based') {
      setHeightText(item.height);
    } else if (type === 'CSS Based') {
      setHeightText(item.style.height);
      setWidthText(item.style.width);
    } else {
      setHeightText(item.height);
      setWidthText(item.width);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderCards = () => {
    return figures.length > 0
      ? (results.length > 0 && results[0].name !== 'no results found'
          ? results
          : figures
        ).map((item, index) => {
          return (
            <Grid
              className={classes.gridItem}
              key={index}
              onClick={() => handleOpen(item)}
              item
            >
              <FigureCard item={item} type={type} />
            </Grid>
          );
        })
      : null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const resultArray = figures.filter(
      (figure) => figure.name.toLowerCase() === text.toLowerCase()
    );
    text === ''
      ? setResults(figures)
      : setResults(
          resultArray.length > 0 ? resultArray : [{ name: 'no results found' }]
        );
  };

  const handleColor = (color, event) => {
    type === 'CSS Based'
      ? setSelectedFigure({
          ...selectedFigure,
          style: { ...selectedFigure.style, backgroundColor: color.hex },
        })
      : setSelectedFigure({ ...selectedFigure, color: color.hex });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    type === 'Imaged Based'
      ? setSelectedFigure({
          ...selectedFigure,
          height: heightText,
        })
      : type === 'CSS Based'
      ? setSelectedFigure({
          ...selectedFigure,
          style: {
            ...selectedFigure.style,
            height: heightText,
            width: widthText,
          },
        })
      : setSelectedFigure({
          ...selectedFigure,
          height: heightText,
          width: widthText,
        });
  };

  const renderShape = () => {
    switch (selectedFigure.name) {
      case 'Rectangle':
        return (
          <Rectangle
            width={selectedFigure.width}
            height={selectedFigure.height}
            fill={{ color: selectedFigure.color }}
            stroke={{ color: '#eee' }}
            strokeWidth={0}
          />
        );
      case 'Circle':
        return (
          <Circle
            r={selectedFigure.width}
            fill={{ color: selectedFigure.color }}
            stroke={{ color: '#E65243' }}
            strokeWidth={0}
          />
        );
      case 'Triangle':
        return (
          <Triangle
            width={selectedFigure.width}
            height={selectedFigure.height}
            fill={{ color: selectedFigure.color }}
            stroke={{ color: '#E65243' }}
            strokeWidth={0}
          />
        );
      case 'Ellipse':
        return (
          <Ellipse
            rx={selectedFigure.width}
            ry={selectedFigure.height}
            fill={{ color: selectedFigure.color }}
            stroke={{ color: '#eee' }}
            strokeWidth={0}
          />
        );
      case 'Line':
        return (
          <Line
            x1={selectedFigure.height}
            x2={selectedFigure.width}
            y1={selectedFigure.height}
            y2={selectedFigure.width}
            stroke={{ color: selectedFigure.color }}
            strokeWidth={3}
          />
        );
      case 'Square':
        return (
          <Rectangle
            width={selectedFigure.width}
            height={selectedFigure.height}
            fill={{ color: selectedFigure.color }}
            stroke={{ color: '#eee' }}
            strokeWidth={0}
          />
        );
      default:
        return <h1>Not supported!</h1>;
    }
  };

  const body = (
    <div className={classes.modal}>
      <div className={classes.modalContainer}>
        <Typography variant="h2">{selectedFigure.name}</Typography>
        <div className={classes.modalMain}>
          {type === 'Image Based' ? (
            <img
              src={selectedFigure.imgUrl}
              height={selectedFigure.height}
              alt={selectedFigure.name}
            />
          ) : type === 'CSS Based' ? (
            <div style={selectedFigure.style} />
          ) : type === 'External Library Based' ? (
            renderShape()
          ) : null}
          {type !== 'Image Based' ? (
            <TwitterPicker
              color={
                selectedFigure.name
                  ? type === 'CSS Based'
                    ? selectedFigure.style.backgroundColor
                    : selectedFigure.color
                  : '#eee'
              }
              triangle="hide"
              colors={colorsOpt}
              width="150px"
              onChange={handleColor}
            />
          ) : null}
        </div>

        <div className={classes.modalOptions}>
          <form className={classes.modalForm} onSubmit={handleEdit}>
            <div>
              <OutlinedInput
                className={classes.modalInput}
                value={heightText}
                onChange={(e) => setHeightText(e.target.value)}
              />
              {type !== 'Image Based' ? (
                <OutlinedInput
                  className={classes.modalInput}
                  value={widthText}
                  onChange={(e) => setWidthText(e.target.value)}
                />
              ) : null}
            </div>
            <Button
              style={{ margin: '1em 0' }}
              variant="contained"
              type="submit"
            >
              Change Figure
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <form onSubmit={(e) => handleSearch(e)}>
          <OutlinedInput
            value={text}
            className={classes.searchBar}
            onChange={(e) => setText(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </form>
        <Grid className={classes.grid}>{renderCards()}</Grid>
      </div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default FiguresList;
