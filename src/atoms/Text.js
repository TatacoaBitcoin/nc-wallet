import React from 'react';
import {Text as RText} from 'react-native';

import Colors from '../styles/colors';
import {fonts} from '../styles/spacing';

const VARIANTS = {
  primary: {
    color: Colors.gray,
    fontFamily: 'Inter-Regular',
  },
  secondary: {
    color: Colors.lightblue,
    fontFamily: 'Inter-Regular',
  },
  title: {
    color: Colors.yellow,
    fontFamily: 'Inter-SemiBold',
  },
  title2: {
    color: Colors.purple,
    fontFamily: 'Inter-SemiBold',
  },
};

const Text = ({
  children,
  variant = 'primary',
  size = fonts.sm,
  align = 'left',
}) => {
  return (
    <RText
      style={{
        color: VARIANTS[variant].color,
        fontFamily: VARIANTS[variant].fontFamily,
        fontSize: size,
        textAlign: align,
      }}>
      {children}
    </RText>
  );
};

export {Text};
