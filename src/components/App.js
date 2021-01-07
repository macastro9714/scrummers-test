import React from 'react';
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from '../theme';
import history from '../history';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route path="/" exact component={LandingPage} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
