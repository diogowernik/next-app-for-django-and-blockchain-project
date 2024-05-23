// @styles/profile-themes/luxuryTheme.js
import { createTheme } from '@mui/material/styles';

const luxuryTheme = createTheme({
  palette: {
    primary: {
      main: '#FFD700',  // Dourado claro e mais visível
      dark: '#C5A500'  // Um dourado um pouco mais escuro para contraste
    },
    secondary: {
      main: '#1A1A1A',  // Preto para detalhes e textos
      dark: '#333'      // Preto suavizado para interações
    },
    background: {
      default: '#282828',  // Fundo mais claro que o preto puro, para melhor contraste
      paper: '#383838'     // Papel com tom acinzentado para diferenciar do fundo
    },
    success: {
      main: '#C5A500'  // Um tom de dourado médio para sucesso
    },
    text: {
      primary: '#FFFFFF',  // Texto branco para máximo contraste
      secondary: '#FFD700' // Texto dourado para destaques e títulos
    }
  },
  typography: {
    h5: {
      fontSize: '1.5rem',
      color: '#FFD700'  // Títulos em dourado claro
    },
    subtitle1: {
      fontSize: '1.25rem',
      color: '#FFFFFF'  // Subtítulos em branco para contraste
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',  // Mantém a textura normal
          backgroundColor: '#C5A500',  // Botões em um dourado médio
          color: '#1A1A1A',  // Texto preto para contraste
          '&:hover': {
            backgroundColor: '#FFD700',
            color: '#282828'  // Texto em um cinza escuro ao passar o mouse
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#FFD700',  // Links em dourado claro
          '&:hover': {
            color: '#C5A500'  // Um tom mais escuro de dourado ao passar o mouse
          }
        }
      }
    }
  }
});

export default luxuryTheme;
