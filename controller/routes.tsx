import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../view/screens/Login';
import ChangePassword from '../view/screens/ChangePassword';
import PasswordRecovery from '../view/screens/PasswordRecovery';
import Register from '../view/screens/Register';
import LoggedTempPage from '../view/screens/LoggedTempPage';


const Stack = createStackNavigator();

export default function App() {
  return( 
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
            name="Login" 
            component={Login}
            options={{ headerShown:false}}
            />

            <Stack.Screen 
            name="Register" 
            component={Register}
            options={{ headerShown:false}}
            />

            <Stack.Screen 
            name="ChangePassword" 
            component={ChangePassword}
            options={{ 
              title:"", 
            }}
            
            />
            <Stack.Screen 
            name="PasswordRecovery" 
            component={PasswordRecovery}
            options={{ 
              title:"",     
            }}
            />    

            <Stack.Screen 
            name="LoggedTempPage" 
            component={LoggedTempPage}
            options={{ headerShown:false}}
            />        
        </Stack.Navigator>
    </NavigationContainer>
  );
}
