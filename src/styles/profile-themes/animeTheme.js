// @styles/profile-themes/animeTheme.js
import { createTheme } from '@mui/material/styles';

const animeTheme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',  // Azul profundo como o oceano, representando a Água
      dark: '#002171'  // Um azul ainda mais escuro para contraste
    },
    secondary: {
      main: '#D32F2F',  // Vermelho intenso, simbolizando o Fogo
      dark: '#9A0007'  // Um vermelho mais escuro para detalhes e interações
    },
    background: {
      default: '#E0F7FA',  // Azul claro e arejado, reminiscente do Ar
      paper: '#B3E5FC'     // Um azul um pouco mais saturado, para componentes de papel
    },
    success: {
      main: '#2E7D32',  // Verde, representando a Terra
      contrastText: '#FFFFFF'  // Texto em branco para máximo contraste
    },
    error: {
      main: '#D32F2F',  // Reutilizando o vermelho para erros, mantendo a temática de Fogo
    },
    warning: {
      main: '#FFA000',  // Laranja, uma cor quente que complementa o vermelho
    },
    info: {
      main: '#0D47A1',  // Azul usado novamente para informações, reforçando a temática de Água
    }
  },
  typography: {
    h5: {
      fontSize: '1.5rem',
      color: '#0D47A1'  // Títulos em azul para uma conexão com a Água
    },
    subtitle1: {
      fontSize: '1.25rem',
      color: '#D32F2F'  // Subtítulos em vermelho para destacar o elemento Fogo
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',  // Mantém a textura normal
          backgroundColor: '#2E7D32',  // Botões em verde, representando a Terra
          color: '#FFFFFF',  // Texto branco para contraste
          '&:hover': {
            backgroundColor: '#1B5E20',
            color: '#FFECB3'  // Texto em amarelo claro ao passar o mouse, simbolizando o ar iluminado
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#0D47A1',  // Links em azul
          '&:hover': {
            color: '#002171'  // Um azul mais escuro ao passar o mouse
          }
        }
      }
    }
  }
});

export default animeTheme;
