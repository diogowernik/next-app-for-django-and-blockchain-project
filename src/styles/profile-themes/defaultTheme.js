// @styles/theme.js
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',  // Cor verde principal
      dark: '#206040'  // Verde mais escuro para hover
    },
    secondary: {
        main: '#7E7E7E', // Cor cinza principal
        dark: '#5E5E5E'  // Cinza mais escuro para hover
      },
    background: {
      default: '#f3f3f3',
      paper: '#e6e6e6'
    },
    success: {
      main: green[500]  // Utilizando cor verde do MUI
    }
  },
  typography: {
    h5: {
      fontSize: '1.5rem',  // Ajuste conforme necessário
    },
    subtitle1: {
      fontSize: '1.25rem',  // Ideal entre body1 e h6
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',  // Remove o efeito de caixa alta
          '&:hover': {
            backgroundColor: '#206040',
            color: '#ffffff'  // Texto fica branco ao passar o mouse
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#2E8B57',
          '&:hover': {
            color: '#206040'
          }
        }
      }
    }
  }
});

export default defaultTheme;
