import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../styles/colors';
import {usePreferencesState} from '../context/preferences.provider';

const Dropdown = ({id, data, placeholder, selectedValue, width = '100%'}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const {currencySetup, languageSetup} = usePreferencesState();

  const valueHandler = selectedItem => {
    if (id === 'currency') {
      currencySetup(selectedItem);
      return;
    }
    if (id === 'lang') {
      languageSetup(selectedItem.value);
      return;
    }
  };

  return (
    <View style={[{width}, open ? {zIndex: 9, height: '100%'} : {zIndex: 1}]}>
      <DropDownPicker
        open={open}
        value={selectedValue}
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
