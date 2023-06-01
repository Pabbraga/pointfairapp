import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function DropList(){
const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);
return (
    <View style={styles.container}>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            }}  
        />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    backgroundColor: 'white',
    padding: 16,
},
dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
},
icon: {
    marginRight: 5,
},
label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
},
placeholderStyle: {
    fontSize: 16,
},
selectedTextStyle: {
    fontSize: 16,
},
iconStyle: {
    width: 20,
    height: 20,
},
inputSearchStyle: {
    height: 40,
    fontSize: 16,
},
});