import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Modal} from '../atoms';

const ResponseModal = ({isVisible, onClose}) => {
  return (
    <Modal isVisible={true} onClose={() => {}} size="md">
      <Text>ResponseModal</Text>
    </Modal>
  );
};

export {ResponseModal};

const styles = StyleSheet.create({});
