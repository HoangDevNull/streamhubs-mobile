import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import merge from 'deepmerge';
import fontConfig from './fontConfig';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const DarkTheme = {
  ...CombinedDarkTheme,
  colors: {
    accent: '#03dac6',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    background: '#000',
    disabled: 'rgba(255, 255, 255, 0.38)',
    error: '#CF6679',
    notification: '#ff80ab',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    placeholder: 'rgba(255, 255, 255, 0.54)',
    primary: '#8734FE',
    surface: '#212121',
    text: '#F9F9F9',
    contrast: '#F9F9F9',
    ripple: 'rgba(255, 255, 255, 0.38)',
  },
  fonts: configureFonts(fontConfig),
};

export const LightTheme = {
  ...CombinedDefaultTheme,
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
    contrast: '#F9F9F9',
    ripple: 'rgba(0, 0, 0, 0.38)',
  },
};
