import React from 'react';
import {View, ScrollView, Button} from 'react-native';

import {useMnemonics} from '../hooks/useMnemonics';
import {WordList} from '../molecules';

const Register = () => {
  const {randomWords, generateWords} = useMnemonics();
  const words = randomWords && randomWords.split(' ');

  return (
    <View>
      {words && (
        <ScrollView>
          <WordList list={words} />
          <Button onPress={generateWords} title="Refresh" />
        </ScrollView>
      )}
    </View>
  );
};

export {Register};
