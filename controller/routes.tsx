//Routes for app
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import loginView from '../view/screens/loginView';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={loginView}/>

          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
