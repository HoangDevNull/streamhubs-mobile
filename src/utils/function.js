export const getScreen = (Dimensions) => {
  const { width, height } = Dimensions.get('window');
  const isPortrait = width < height;
  return { isPortrait, width, height };
};
