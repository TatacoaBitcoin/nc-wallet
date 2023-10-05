import React from 'react';
import {Text as RText} from 'react-native';

// import Colors from '../styles/colors';

const VARIANTS = {
  primary: {
    color: 'red',
    fontFamily: 'Inter-Regular',
  },
  title: {
    color: 'blue',
    fontFamily: 'Inter-SemiBold',
  },
};

const Text = ({children, variant = 'primary', size = 16, align = 'left'}) => {
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
