import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1de8b5', //light green
      secondary: '#7986cb', //light purple,
      yellow: '#ffca28',
      red: '#ef5350',
      blue: '#42a5f5',
      white: '#eeeeee',
      contrastText: '#424242',
    },
    type: 'dark',
  },
});
