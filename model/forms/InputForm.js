import { TextInput, StyleSheet, View, ImagePropTypes } from 'react-native';
import styles from '../../view/styles/views/Input/defaultInput';
import React from 'react';

export default function InputForm (props){
  const {value, handler, style} = props;

  return (
    <View >
    <TextInput
      placeholder={props.placeholder}
      onChangeText={text => handler(text)}
      autoCorrect={props.autoCorrect}
      secureTextEntry={props.secureTextEntry}
      style = {props.style ? props.style : styles.inputLogin }
      value={value}
      textContentType={props.textContentType}
      keyboardType={props.keyboardType}
      autoCapitalize={props.autoCapitalize}
      autoCorrect={false}
      autoCompleteType={props.autoCompleteType}
    />
    </View>
  );
}