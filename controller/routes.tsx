import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import loginView from '../view/screens/loginView';
import registerView from '../view/screens/registerView';
import changePassword from '../view/screens/changePassword';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={loginView}/>
            
        </Stack.Navigator>
    </NavigationContainer>
  );
}
