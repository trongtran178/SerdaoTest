import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
type CommonTextInputProps = {} & React.ComponentProps<typeof TextInput>;

export const CommonTextInput = (props: CommonTextInputProps) => {
  return <TextInput style={styles.textInput} {...props} />;
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginVertical: 8,
    width: '80%',
    height: 50,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2}, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow
    shadowRadius: 5, // for iOS shadow
  },
});
