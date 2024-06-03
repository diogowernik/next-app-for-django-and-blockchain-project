// @styles/theme.js
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',  // Cor verde principal
      dark: '#206040'  // Verde mais escuro para hover
    },
    // blue
    secondary: {
      main: '#87CEEB',  // Azul claro escolhido
      dark: '#367588'   // Uma opção de azul petróleo para hover ou detalhes
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
    },
    subtitle2: {
      fontSize: '1rem',  // Ideal entre body1 e body2
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

export default theme;
