import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../styles/colors';
import {usePreferencesState} from '../context/preferences.provider';

const Dropdown = ({id, data, placeholder}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const {currencySetup} = usePreferencesState();

  const valueHandler = selectedItem => {
    if (id === 'currency') {
      currencySetup(selectedItem);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={item}
        items={data}
        setOpen={setOpen}
        setValue={setItem}
        placeholder={placeholder}
        onSelectItem={valueHandler}
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
