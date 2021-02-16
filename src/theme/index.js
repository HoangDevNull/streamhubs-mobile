import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { DarkTheme, LightTheme } from './themeConfig';

const CustomPaperTheme = ({ children }) => {
  const { theme } = useSelector((state) => state.user);
  return (
    <PaperProvider theme={theme.includes('dark') ? DarkTheme : LightTheme}>
      {children}
    </PaperProvider>
  );
};

export default CustomPaperTheme;
export { DarkTheme, LightTheme };
