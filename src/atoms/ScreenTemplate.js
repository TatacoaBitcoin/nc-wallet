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
        paddingTop: insets.top + 10,
        paddingBottom: insets.bottom + 10,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
        backgroundColor: 'gray',
      }}>
      {children}
    </View>
  );
};

export {ScreenTemplate};
