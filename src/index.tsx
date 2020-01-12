import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { App } from './App';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  overrides: {
    MuiTableCell: {
      head: {
        fontWeight: 600,
      },
    },
    MuiSelect: {
      outlined: {
        padding: '8.5px 14px',
      },
    },
    MuiInputLabel: {
      outlined: {
        '&$shrink': {
          transform: 'translate(1px, -13px) scale(0.75)',
        },
      },
    },
  },
});

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root'),
);
