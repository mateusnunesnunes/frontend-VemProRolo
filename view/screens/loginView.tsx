import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/views/loginView';
export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>LoginScreen!</Text>
      </View>
    );
  }
}
