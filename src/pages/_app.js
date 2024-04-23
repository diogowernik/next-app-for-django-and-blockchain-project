import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { MetamaskProvider } from '@/context/MetamaskContext';
import { DjangoProvider } from '@/context/DjangoContext';  

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <MetamaskProvider>
          <DjangoProvider>  
            <Component {...pageProps} />
          </DjangoProvider>
        </MetamaskProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
