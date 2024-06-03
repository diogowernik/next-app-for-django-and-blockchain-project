// @/styles/theme.js
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',
      dark: '#206040'
    },
    secondary: {
      main: '#87CEEB',
      dark: '#367588'
    },
    background: {
      default: '#f3f3f3',
      paper: '#e6e6e6'
    },
    success: {
      main: green[500]
    }
  },
  typography: {
    h5: {
      fontSize: '1.5rem',
    },
    subtitle1: {
      fontSize: '1.25rem',
    },
    subtitle2: {
      fontSize: '1rem',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          backgroundColor: '#eceff1'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          color: '#2E8B57',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: '500',
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          color: '#424242'
        }
      }
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #e0e0e0',
          padding: '8px', // Usando um valor fixo, substitua pelo theme.spacing(1) se necessário
        }
      }
    },
    // Incluir outros overrides conforme necessário
  }
});

export default theme;
