import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';

export function useScreenSize() {
  const [size, setSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    isPortrait: Orientation.getInitialOrientation().includes('PORTRAIT'),
  });

  useEffect(() => {
    const handleChange = ({ window: { width, height } }) => {
      Orientation.getOrientation((o) =>
        setSize({
          width: width,
          height: height,
          isPortrait: o.includes('PORTRAIT'),
        }),
      );
    };

    Dimensions.addEventListener('change', handleChange);
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return size;
}
