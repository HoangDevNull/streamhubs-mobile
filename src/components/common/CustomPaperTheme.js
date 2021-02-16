import React from 'react';

import {
  configureFonts,
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useSelector } from 'react-redux';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    // Headline, Text,....
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: 'normal',
    },
    // Button
    medium: {
      fontFamily: 'Inter-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter-thin',
      fontWeight: 'normal',
    },
  },
};

const dark = {
  ...DarkTheme,
  colors: {
    accent: '#03dac6',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#121212',
    disabled: 'rgba(255, 255, 255, 0.38)',
    error: '#CF6679',
    notification: '#ff80ab',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    placeholder: 'rgba(255, 255, 255, 0.54)',
    primary: '#8734FE',
    surface: '#121212',
    text: '#F9F9F9',
  },
  fonts: configureFonts(fontConfig),
};

const light = {
  ...DefaultTheme,
  colors: {
    accent: '#03dac4',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#f6f6f6',
    disabled: 'rgba(0, 0, 0, 0.26)',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#000000',
    onSurface: '#000000',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    primary: '#8734FE',
    surface: '#ffffff',
    text: '#000000',
  },
};

const CustomPaperTheme = ({ children }) => {
  const { theme } = useSelector((state) => state.user);
  return (
    <PaperProvider theme={theme.includes('dark') ? dark : light}>
      {children}
    </PaperProvider>
  );
};

export default CustomPaperTheme;
