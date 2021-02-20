import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export function useScreenSize() {
  const [size, setSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const handleChange = ({ window: { width, height } }) => {
      if (width < height) {
        setSize({ width: width, height: height });
      } else {
        setSize({ width: height, height: width });
      }
    };

    Dimensions.addEventListener('change', handleChange);
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return size;
}
