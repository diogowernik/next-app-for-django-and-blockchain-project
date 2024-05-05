//@pages/_app.js

import React from 'react';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from '@/context/AuthContext';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/styles/theme';
import '@/styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
