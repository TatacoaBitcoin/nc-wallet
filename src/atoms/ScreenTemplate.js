import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AlertModal} from '../molecules';
import colors from '../styles/colors';

const ScreenTemplate = ({children, clearError, error}) => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!error) {
      return;
    }
    setIsModalVisible(true);
  }, [error]);

  const handleModalClose = () => {
    clearError();
    setIsModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: '',
        backgroundColor: colors.black,
      }}>
      {children}
      <AlertModal
        isVisible={isModalVisible}
        onClose={() => handleModalClose()}
        message={error?.message}
      />
    </View>
  );
};

export {ScreenTemplate};
