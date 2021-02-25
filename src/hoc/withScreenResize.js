import React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';

/**
 *
 * @param  {...any} args : Using like a breakpoit in withStyle
 * just pass the query like css : 'min-with:600px' in props of HOC
 * or use callback inside : theme => theme.breakpoints.[up/down]('arg');
 */
export default function withResize(WrappedComponent) {
  return class Resize extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        orientation: Orientation.getInitialOrientation(),
      };
    }
    onresize = ({ window: { width, height } }) => {
      Orientation.getOrientation((o) =>
        this.setState({ width: width, height: height, orientation: o }),
      );
    };

    componentDidMount() {
      Dimensions.addEventListener('change', this.onresize);
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.onresize);
    }
    render() {
      return <WrappedComponent {...this.props} screenSize={this.state} />;
    }
  };
}
