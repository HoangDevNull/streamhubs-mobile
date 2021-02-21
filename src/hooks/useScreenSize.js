import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export function useScreenSize() {
  const [size, setSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const handleChange = ({ window: { width, height } }) => {
      setSize({ width: width, height: height });
    };

    Dimensions.addEventListener('change', handleChange);
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return size;
}
