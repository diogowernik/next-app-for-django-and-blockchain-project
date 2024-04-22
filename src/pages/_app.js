import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { MetamaskAuthProvider } from '@/context/MetamaskAuthContext';
import { DjangoAuthProvider } from '@/context/DjangoAuthContext';  // Certifique-se de importar DjangoAuthProvider

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <MetamaskAuthProvider>
          <DjangoAuthProvider>  
            <Component {...pageProps} />
          </DjangoAuthProvider>
        </MetamaskAuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
