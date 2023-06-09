import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';

export const ThemeContext = createContext((_themeName) => {});

const ThemeProviderWrapper = (props) => {
  const [themeName, _setThemeName] = useState('GreenFieldsTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'GreenFieldsTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
