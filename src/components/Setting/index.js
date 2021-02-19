import { makeStyles } from '@blackbox-vision/react-native-paper-use-styles';
import React from 'react';
import { Text, View, Dimensions, Animated } from 'react-native';
import { withTheme } from 'react-native-paper';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import GoBackButton from '../common/GoBackButton';

const windowHeight = Dimensions.get('window').height;
const { event, ValueXY } = Animated;
const scrollY = new ValueXY();

const text = {
  biography: `The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price.
  The assassin droid IG-11 was also dispatched to terminate him. After working together to storm the encampment the infant was being held in, the Mandalorian and IG-11 found the Child. IG-11 then attempted to terminate the Child. The Mandalorian shot the droid before the he was able to assassinate the Child.
  Shortly after, the Mandalorian took the Child back to his ship. On the way they were attacked by a trio of Trandoshan bounty hunters, who attempted to kill the Child. After the Mandalorian defeated them, he and the Child camped out in the desert for the night. While the Mandalorian sat by the fire, the Child ate one of the creatures moving around nearby. He then approached the bounty hunter and attempted to use the Force to heal one of the Mandalorian's wounds. The Mandalorian stopped him and placed him back into his pod. The next day, the pair made it to the Razor Crest only to find it being scavenged by Jawas. The Mandalorian attacked their sandcrawler for the scavenged parts and attempted to climb it while the Child followed in his pod. However, the Mandalorian was knocked down to the ground`,
  powers: 'Powers and Abilities',
  appearances: 'Appearances',
};

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    marginTop: 55,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerText: {
    color: 'white',
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 40,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: theme.colors.primary,
  },
  tabTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: theme.colors.text,
  },
  tabWrapperStyle: {
    paddingVertical: 10,
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    height: windowHeight,
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    color: theme.colors.text,
  },
}));

const Setting = ({ navigation, theme }) => {
  const styles = useStyles();

  const renderContent = (x) => (
    <View style={styles.contentContainer}>
      <Text style={styles.contentText}>{x}</Text>
    </View>
  );

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <GoBackButton navigation={navigation} />
          <Animated.View style={{ opacity }}>
            <Text style={styles.headerText}>Hoang Pham</Text>
          </Animated.View>
        </View>
      </View>
    );
  };

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      // backgroundImage={{
      //   uri:
      //     'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      // }}
      backgroundColor={theme.colors.background}
      header={renderHeader}
      title={'Hoang Pham'}
      titleStyle={styles.titleStyle}
      foregroundImage={{
        uri: 'https://material-ui.com/static/images/avatar/1.jpg',
      }}
      tabs={[
        {
          title: 'Biography',
          content: renderContent(text.biography),
        },
        {
          title: 'Powers and Abilities',
          content: renderContent(text.powers),
        },
        {
          title: 'Appearances',
          content: renderContent(text.appearances),
        },
        {
          title: 'tex2',
          content: renderContent(text.appearances),
        },
        {
          title: 'tex1',
          content: renderContent(text.appearances),
        },
      ]}
      tabTextContainerStyle={styles.tabTextContainerStyle}
      tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
      tabTextStyle={styles.tabTextStyle}
      tabWrapperStyle={styles.tabWrapperStyle}
      tabsContainerStyle={styles.tabsContainerStyle}
      scrollEvent={event(
        [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
        { useNativeDriver: false },
      )}
    />
  );
};
export default withTheme(Setting);
