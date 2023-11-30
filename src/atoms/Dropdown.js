import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../styles/colors';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Pear', value: 'pear'},
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Choose a fruit.'}
        {...dropdownStyles}
      />
    </View>
  );
};

export {Dropdown};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

const dropdownStyles = StyleSheet.create({
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.black,
  },
  placeholderStyle: {
    color: Colors.gray,
  },
  style: {
    backgroundColor: Colors.black,
    borderColor: Colors.gray,
  },
  textStyle: {
    fontSize: 15,
  },
  labelStyle: {
    color: Colors.gray,
  },
  listItemLabelStyle: {
    color: Colors.gray,
  },
  arrowIconStyle: {
    tintColor: Colors.yellow,
  },
  tickIconStyle: {
    tintColor: Colors.yellow,
  },
});
