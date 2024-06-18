// @styles/theme.js
import { createTheme } from '@mui/material/styles';
import { green, yellow, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',  // Cor verde principal para Conectar
      dark: '#206040'  // Verde mais escuro para hover
    },
    connecting: {
      main: yellow[800],  // Cor amarela para Conectando
      dark: yellow[900]
    },
    connected: {
      main: green[500],  // Cor verde do MUI para Conectado
      dark: green[700]
    },
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
          fontFamily: '"Roboto Condensed", sans-serif'
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
    },
    

  }
});

export default theme;
