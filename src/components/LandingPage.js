import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import styled, { css } from 'styled-components';

import history from '../history';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.contrastText,
    height: '100vh',
  },
  optionsGrid: {
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
  },
  title: {
    position: 'relative',
    fontSize: '4.5vw',
    fontWeight: 'bold',
    textShadow: '1px 1px black',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
      fontSize: '4vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2vw',
    },
  },
  body: {
    position: 'relative',
    fontSize: '3.5vw',
    textShadow: '1px 1px black',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
      fontSize: '2.7vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.2vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.8vw',
    },
  },
  expanded: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    fontSize: '4.5vw',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
      fontSize: '4vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '2vw',
    },
  },
}));

const options = [
  {
    name: 'Image Based',
    top: 0,
    left: 0,
    hoverColor: '#1de8b5',
  },
  {
    name: 'CSS Based',
    top: window.innerWidth <= 865 ? 33.3334 : 0,
    left: window.innerWidth <= 865 ? 0 : 33.3334,
    hoverColor: '#7986cb',
  },
  {
    name: 'External Library Based',
    top: window.innerWidth <= 865 ? 66.6666 : 0,
    left: window.innerWidth <= 865 ? 0 : 66.6666,
    hoverColor: '#42a5f5',
  },
];

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  width: 100%;
  background-color: grey;
`;

const Item = styled.div`
  position: absolute;
  height: ${window.innerWidth <= 865 ? 33.333333 : 100}%;
  width: ${window.innerWidth <= 865 ? 100 : 33.333333}%;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  background-color: #424242;
  color: white;
  text-align: center;
  z-index: 1;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.hoverColor};
  }
  ${(props) =>
    props.isOpening &&
    css`
      position: absolute;
      z-index: 5;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: #424242;
      transition: 0.5s;
      &:hover {
        filter: brightness(100%);
        cursor: pointer;
      }
    `}
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingPage = () => {
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = useState('none'); // none / Image Based / CSS Based / External Library Based
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (selectedOption !== 'none') renderSelectedOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const renderSelectedOption = () => {
    var titleOpt = '';
    var infoOpt = '';
    switch (selectedOption) {
      case 'Image Based':
        titleOpt = 'Image Based';
        infoOpt = 'Image Based';
        break;
      case 'CSS Based':
        titleOpt = 'CSS Based';
        infoOpt = 'CSS Based';
        break;
      case 'External Library Based':
        titleOpt = 'External Library Based';
        infoOpt = 'External Library Based';
        break;
      default:
        break;
    }
    setTitle(titleOpt);
    setInfo(infoOpt);
  };

  const handleOption = (option) => {
    if (!isOpen) {
      setSelectedOption(option);
      setIsOpening(true);
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    } else {
      setSelectedOption('none');
      setIsOpening(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  const renderOptions = () => {
    return options.map(({ name, top, left, hoverColor }, index) => {
      return (
        <Item
          key={index}
          isOpening={isOpening && selectedOption === name}
          onClick={() => handleOption(name)}
          top={top}
          left={left}
          hoverColor={hoverColor}
        >
          {!isOpen ? (
            isOpening ? null : (
              <Typography className={classes.title} variant="h2">
                {name}
              </Typography>
            )
          ) : selectedOption === name ? (
            <div className={classes.expanded}>
              <Typography className={classes.title} variant="h2">
                {title}
              </Typography>
              <Typography className={classes.body} variant="body1">
                {info}
              </Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => history.push(`/list/${selectedOption}`)}
              >
                GO!
              </Button>
            </div>
          ) : (
            <div />
          )}
        </Item>
      );
    });
  };

  return (
    <div className={classes.pageContainer}>
      <InnerContainer>{renderOptions()}</InnerContainer>
    </div>
  );
};

export default LandingPage;
