import { useRef, useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
export function useDeviceOrientationChange(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function listener(ori) {
      savedCallback.current(ori);
    }
    const initial = Orientation.getInitialOrientation();
    listener(initial);
    Orientation.addDeviceOrientationListener(listener);

    return () => {
      Orientation.removeDeviceOrientationListener(listener);
    };
  }, []);
}
