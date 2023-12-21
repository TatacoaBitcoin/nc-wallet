import React from 'react';
import {ScrollView, StyleSheet, View, TextInput} from 'react-native';
import {Wordlists} from '@dreson4/react-native-quick-bip39';

import {Text} from '../atoms';
import {fonts, margin, padding} from '../styles/spacing';
import colors from '../styles/colors';
import Colors from '../styles/colors';

const WordsInput = ({words, setWords}) => {
  const handleInputChange = (value, index) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const isValidWord = word => {
    // TODO: add support for spanish words
    if (Wordlists['en'].includes(word)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      {words.map((word, idx) => (
        <View
          key={idx}
          style={[
            styles.inputContainer,
            word.length > 2
              ? isValidWord(word)
                ? styles.inputContainerValid
                : styles.inputContainerInvalid
              : styles.inputContainerEmpty,
          ]}>
          <Text>{idx + 1}.</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => handleInputChange(value, idx)}
            value={word}
            autoCapitalize={'none'}
            autoComplete="off"
            autoCorrect={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export {WordsInput};

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: margin.md,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: margin.md,
    justifyContent: 'space-around',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    paddingHorizontal: padding.md,
    paddingVertical: padding.xs,
    borderRadius: margin.lg,
    gap: margin.xs,
  },
  inputContainerEmpty: {
    borderColor: colors.gray,
  },
  inputContainerInvalid: {
    borderColor: 'red',
  },
  inputContainerValid: {
    borderColor: 'green',
  },
  input: {
    width: '80%',
    color: Colors.gray,
    fontFamily: 'Inter-SemiBold',
    fontSize: fonts.sm,
  },
});
