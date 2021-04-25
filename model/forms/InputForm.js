import { TextInput, StyleSheet, View, ImagePropTypes } from 'react-native';
import React from 'react';

export default function InputForm (props){
  const {value, handler, style} = props;

  return (
    <View >
    <TextInput
      placeholder={props.name}
      onChangeText={text => handler(text)}
      style = {props.style}
      value={value}
    />
    </View>
  );
}