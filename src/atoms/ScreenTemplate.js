import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScreenTemplate = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: 'lightgray',
      }}>
      {children}
    </View>
  );
};

export {ScreenTemplate};
