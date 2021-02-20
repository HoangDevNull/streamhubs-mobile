import React from 'react';
import { Dimensions, Platform, View, StyleSheet } from 'react-native';
import { Button, Text, withTheme } from 'react-native-paper';
import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import VideoSlide from './components/VideoSlide';
const Home = ({ navigation, theme }) => {
  const styles = useStyles();

  return <VideoSlide />;
};

export default withTheme(Home);

const useStyles = makeStyles((theme) => ({}));
