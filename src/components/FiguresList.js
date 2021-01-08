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
  Menu,
  IconButton,
} from '@material-ui/core';
import { Search as SearchIcon, ArrowBackIos } from '@material-ui/icons';
import { TwitterPicker } from 'react-color';
import { Rectangle, Circle, Ellipse, Line, Triangle } from 'react-shapes';

import history from '../history';
import FigureCard from './FigureCard';

/* 
Here a list with the desires shapes will be rendered, according to what the user selected before
 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: '2.8%',
    left: '1%',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      top: '2%',
      left: '5%',
      margin: '0',
    },
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
    minWidth: '70vw',
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
    width: '90%',
    height: '90%',
    backgroundColor: theme.palette.primary.white,
    top: '5%',
    left: '5%',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '70%',
      top: '15%',
      left: '20%',
    },
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  modalTitle: {
    maxWidth: '90%',
    textAlign: 'justify',
    margin: '2em 0 1em 0',
    fontSize: '9vw',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
      fontSize: '7vw',
      margin: '0',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
      fontSize: '5vw',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
      fontSize: '3vw',
    },
  },
  modalMain: {
    display: 'flex',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  colorPicker: {
    margin: '1em 0',
    [theme.breakpoints.up('sm')]: {
      margin: '0',
    },
  },
  modalOptions: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('sm')]: {
      height: '20%',
    },
  },
  modalForm: {
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalInputsContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  modalInput: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  addContainer: {
    height: '80vh',
    width: '95vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addForm: {
    height: '100%',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));

/* 
This lists are the default content of each one. 
 */

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
      borderLeftWidth: '75px',
      borderRightWidth: '75px',
      borderBottomWidth: '150px',
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
    type: 'Rectangle',
  },
  {
    name: 'Circle',
    width: 70,
    height: 70,
    color: '#42a5f5',
    type: 'Circle',
  },
  {
    name: 'Ellipse',
    width: 100,
    height: 60,
    color: '#42a5f5',
    type: 'Ellipse',
  },
  {
    name: 'Line',
    width: 125,
    height: 25,
    color: '#42a5f5',
    type: 'Line',
  },
  {
    name: 'Triangle',
    width: 110,
    height: 110,
    color: '#42a5f5',
    type: 'Triangle',
  },
];

/* 
Default colors for colorpicker. 
 */

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

  const [type, setType] = useState(''); //Represent the selected option of list in the landing page menu, Ex: Images Version
  const [text, setText] = useState(''); //Search bar text
  const [figures, setFigures] = useState([]); //Array of geometrical figures
  const [results, setResults] = useState([]); //Result of Search
  const [open, setOpen] = useState(false); //Boolean for open the modal with the editting options
  const [selectedFigure, setSelectedFigure] = useState({}); //Current selected figure of list to edit or delete
  const [heightText, setHeightText] = useState(''); //Height text to edit figures
  const [widthText, setWidthText] = useState(''); //Width text to edit figures
  const [imgUrl, setImgUrl] = useState(''); //Img url to edit figures
  const [anchorEl, setAnchorEl] = useState(null); //Boolean for open the create section of a figure
  const [imgData, setImgData] = useState({
    imgUrl: 'Img Url',
    height: '150px',
    name: 'Img Name',
  }); //Data to create a new Image based figure
  const [cssData, setCssData] = useState({
    name: 'Css Name',
    style: 'Add a css Style!',
  }); //Data to create a new css based figure
  const [libData, setLibData] = useState({
    name: 'Lib Name',
    width: 100,
    height: 100,
    color: '#42a5f5',
    type: 'Write a Type!',
  }); //Data to create a new figure based on an external library

  /* 
  Here the type info is going to be taken from the path of the address
 */
  useEffect(() => {
    setType(match.params.type);
    if (figures.length > 0) setResults(figures);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 
 According to the type the list will be initialized
 */
  useEffect(() => {
    type === 'Image Based'
      ? setFigures([...imgList])
      : type === 'CSS Based'
      ? setFigures([...cssList])
      : type === 'External Library Based'
      ? setFigures([...libList])
      : setFigures([]);
  }, [type]);

  /* 
  Here the an item will be updated when it is eddited in some way
 */
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

  /* 
  This will allow to see the results of editing in real time even in the middle of a search
 */
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

  /* 
  The modal will be opened with the values of the selected figure as default values.
 */
  const handleOpen = (item) => {
    setSelectedFigure(item);
    if (type === 'Image Based') {
      console.log(item);
      setHeightText(item.height);
      setImgUrl(item.imgUrl);
    } else if (type === 'CSS Based') {
      if (item.name === 'triangle') {
        setHeightText(item.style.borderBottomWidth);
        setWidthText(item.style.borderLeftWidth);
      } else {
        setHeightText(item.style.height);
        setWidthText(item.style.width);
      }
    } else {
      setHeightText(item.height);
      setWidthText(item.width);
    }

    setOpen(true);
  };

  /* 
  The modal will be closed.
 */
  const handleClose = () => {
    setOpen(false);
  };

  /* 
  A selected item will be deleted.
 */
  const handleDelete = (item) => {
    const index = figures.map((e) => e.name).indexOf(item.name);
    const updatedFigures = [...figures];
    if (index !== -1) updatedFigures.splice(index, 1);
    if (JSON.stringify(figures) !== JSON.stringify(updatedFigures)) {
      setFigures(updatedFigures);
    }
  };

  /* 
  Each item in a list will be a card with the figure, the name and a deleting option, here the list will be map into cards inside a grid
 */
  const renderCards = () => {
    return figures.length > 0
      ? (results.length > 0 ? results : figures).map((item, index) => {
          return (
            <Grid className={classes.gridItem} key={index} item>
              <FigureCard
                item={item}
                type={type}
                handleOpen={() => handleOpen(item)}
                handleDelete={() => handleDelete(item)}
              />
            </Grid>
          );
        })
      : null;
  };

  /* 
  Handling search function TODO: search while writing
 */
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

  /* 
  A color can be selected in the colorpicker and edit the selected figure
 */
  const handleColor = (color, event) => {
    type === 'CSS Based'
      ? selectedFigure.name === 'triangle'
        ? setSelectedFigure({
            ...selectedFigure,
            style: { ...selectedFigure.style, borderBottomColor: color.hex },
          })
        : setSelectedFigure({
            ...selectedFigure,
            style: { ...selectedFigure.style, backgroundColor: color.hex },
          })
      : setSelectedFigure({ ...selectedFigure, color: color.hex });
  };

  /* 
  Here the selected figure is updated with the new info TODO: form validation
 */
  const handleEdit = (e) => {
    e.preventDefault();
    type === 'Image Based'
      ? setSelectedFigure({
          ...selectedFigure,
          height: heightText,
          imgUrl: imgUrl,
        })
      : type === 'CSS Based'
      ? selectedFigure.name === 'triangle'
        ? setSelectedFigure({
            ...selectedFigure,
            style: {
              ...selectedFigure.style,
              borderBottomWidth: heightText,
              borderLeftWidth: widthText,
              borderRightWidth: widthText,
            },
          })
        : setSelectedFigure({
            ...selectedFigure,
            style: {
              ...selectedFigure.style,
              height: heightText,
              width: widthText,
            },
          })
      : setSelectedFigure({
          ...selectedFigure,
          height: parseInt(heightText),
          width: parseInt(widthText),
        });
  };

  /* 
  According to the data of a figure this function will return a component that suits the criteria 
 */
  const renderShape = () => {
    switch (selectedFigure.type) {
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
      default:
        return <h1>Not supported!</h1>;
    }
  };

  /* 
  Body of the modal
 */
  const body = (
    <div className={classes.modal}>
      <div className={classes.modalContainer}>
        <Typography className={classes.modalTitle} variant="h2">
          {selectedFigure.name}
        </Typography>
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
              className={classes.colorPicker}
              color={
                selectedFigure.name
                  ? type === 'CSS Based'
                    ? selectedFigure.name === 'triangle'
                      ? selectedFigure.style.borderBottomColor
                      : selectedFigure.style.backgroundColor
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
            <div className={classes.modalInputsContainer}>
              {type === 'External Library Based' &&
              (selectedFigure.name === 'Line' ||
                selectedFigure.name === 'Circle') ? null : (
                <React.Fragment>
                  <Typography>{'Heigth: '}</Typography>
                  <OutlinedInput
                    className={classes.modalInput}
                    value={heightText}
                    onChange={(e) => setHeightText(e.target.value)}
                  />
                </React.Fragment>
              )}
              {type !== 'Image Based' ? (
                <React.Fragment>
                  <Typography>{'Width: '}</Typography>
                  <OutlinedInput
                    className={classes.modalInput}
                    value={widthText}
                    onChange={(e) => setWidthText(e.target.value)}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography>{'Img Url: '}</Typography>
                  <OutlinedInput
                    className={classes.modalInput}
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </React.Fragment>
              )}
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

  /* 
  Open section to add a new figure
 */
  const handleClickAdd = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /* 
  Close section to add a new figure
 */
  const handleCloseAdd = () => {
    setAnchorEl(null);
  };

  /* 
  Logic to add a new figure
 */
  const handleAddFigure = (e) => {
    e.preventDefault();
    const updatedFigures = [...figures];
    if (type === 'Image Based') {
      const nameVerification = figures.map((e) => e.name).indexOf(imgData.name);
      if (nameVerification === -1) {
        updatedFigures.push(imgData);
      }
    } else if (type === 'CSS Based') {
      const nameVerification = figures.map((e) => e.name).indexOf(cssData.name);
      if (nameVerification === -1) {
        const cssFigure = {
          name: cssData.name,
          style: JSON.parse(cssData.style),
        };
        updatedFigures.push(cssFigure);
      }
    } else {
      const nameVerification = figures.map((e) => e.name).indexOf(libData.name);
      if (nameVerification === -1) {
        updatedFigures.push(libData);
      }
    }
    if (JSON.stringify(figures) !== JSON.stringify(updatedFigures)) {
      setFigures(updatedFigures);
    }
    setAnchorEl(null);
  };

  /* 
  Render options inside the section to add a new figure
 */
  const renderAddFigure = () => {
    return (
      <form className={classes.addForm} onSubmit={handleAddFigure}>
        <div>
          {type === 'Image Based' ? (
            <React.Fragment>
              <Typography>{'Name: '}</Typography>
              <OutlinedInput
                value={imgData.name}
                onChange={(e) =>
                  setImgData({ ...imgData, name: e.target.value })
                }
              />
              <Typography>{'Img Url: '}</Typography>
              <OutlinedInput
                value={imgData.imgUrl}
                onChange={(e) =>
                  setImgData({ ...imgData, imgUrl: e.target.value })
                }
              />
              <Typography>{'Height: '}</Typography>
              <OutlinedInput
                value={imgData.height}
                onChange={(e) =>
                  setImgData({ ...imgData, height: e.target.value })
                }
              />
            </React.Fragment>
          ) : type === 'CSS Based' ? (
            <React.Fragment>
              <Typography>{'Name: '}</Typography>
              <OutlinedInput
                value={cssData.name}
                onChange={(e) =>
                  setCssData({ ...cssData, name: e.target.value })
                }
              />
              <Typography>{'Style: '}</Typography>
              <OutlinedInput
                value={cssData.style}
                multiline={true}
                onChange={(e) =>
                  setCssData({ ...cssData, style: e.target.value })
                }
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography>{'Name: '}</Typography>
              <OutlinedInput
                value={libData.name}
                onChange={(e) =>
                  setLibData({ ...libData, name: e.target.value })
                }
              />
              <Typography>{'Width: '}</Typography>
              <OutlinedInput
                value={libData.width}
                onChange={(e) =>
                  setLibData({ ...libData, width: e.target.value })
                }
              />
              <Typography>{'Height: '}</Typography>
              <OutlinedInput
                value={libData.height}
                onChange={(e) =>
                  setLibData({ ...libData, height: e.target.value })
                }
              />
              <Typography>{'Type: '}</Typography>
              <OutlinedInput
                value={libData.type}
                onChange={(e) =>
                  setLibData({ ...libData, type: e.target.value })
                }
              />
            </React.Fragment>
          )}
        </div>
        <Button style={{ margin: '1em 0' }} variant="contained" type="submit">
          Create Figure
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      {/* Return to main page button */}
      <IconButton
        className={classes.backButton}
        onClick={() => history.goBack()}
      >
        <ArrowBackIos />
      </IconButton>
      <div className={classes.container}>
        {/* Search Bar */}
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
        <div>
          {/* Button to open section to add a new figure */}
          <Button
            style={{ margin: '1em 1em', backgroundColor: '#1de8b5' }}
            variant="contained"
            onClick={handleClickAdd}
          >
            Add Element
          </Button>
        </div>
        {/* Figures List */}
        <Grid className={classes.grid}>{renderCards()}</Grid>
      </div>
      {/* Section to add a new figure */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseAdd}
      >
        <div className={classes.addContainer}>{renderAddFigure()}</div>
      </Menu>
      {/* Modal which contains edditing options for a selected figure */}
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default FiguresList;
