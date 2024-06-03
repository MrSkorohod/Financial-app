'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';
import theme from '../../theme';
import { ToastContainer } from 'react-toastify';

export default function MainThemeContext({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
