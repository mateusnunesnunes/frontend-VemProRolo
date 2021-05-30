import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../view/screens/Login';
import ChangePassword from '../view/screens/ChangePassword';
import PasswordRecovery from '../view/screens/PasswordRecovery';
import {Register} from '../view/screens/Register';
import CodeVerification from '../view/screens/CodeVerification';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import LikePage from '../view/screens/LikePage';
import ProfilePage from '../view/screens/ProfilePage';
import CommercialPage from '../view/screens/CommercialPage';
import { Image, StyleSheet } from 'react-native';
import images from '../view/themes/Images';
import { colors } from '../view/styles/Colors';
import { Header } from '../components/Header';
import { VehicleRegisterPage } from '../view/screens/VehicleRegisterPage';

export type ParamList = {
  Login: undefined,
  Register: undefined,
  ChangePassword: undefined,
  PasswordRecovery: undefined,
  LoggedTempPage: undefined,
  CodeVerification: {
    email: string;
    password: string;
  },
  TabMenu: undefined;
  CommercialPage: undefined;
  LikePage: undefined;
  ProfilePage: undefined;
  MainStack: undefined;
  LoginStack: undefined;
  VehicleRegisterPage: undefined;
};

const Stack = createStackNavigator<ParamList>();
const Tab = createBottomTabNavigator();


const TabMenu = (): JSX.Element => {
  return (
    <Tab.Navigator 
      initialRouteName={'ProfilePage'}
      tabBarOptions={{
        showLabel: false,
      }}
      
    >
      <Tab.Screen 
       name={'CommercialPage'} 
       component={CommercialPage}
       options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Image 
            source={images.commercialIcon} 
            resizeMode='contain' 
            style={{
              ...styles.imageIcon,
              tintColor: focused ? colors.black : colors.lightGrey
            }}
          />
        ),
      }}
      />
      <Tab.Screen 
        name={'LikePage'} 
        component={LikePage} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image 
              source={images.fireIcon} 
              resizeMode='contain' 
              style={{
                ...styles.imageIcon,
                tintColor: focused ? colors.black : colors.lightGrey
              }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name={'ProfilePage'} 
        component={ProfilePage} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <Image 
              source={images.profileIcon} 
              resizeMode='contain' 
              style={{
                ...styles.imageIcon,
                tintColor: focused ? colors.black : colors.lightGrey
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return( 
    <NavigationContainer>
        <Stack.Navigator initialRouteName="MainStack">
          <Stack.Screen
            name={'LoginStack'}
            component={LoginStack}
            options={{ headerShown:false}}
          />
          <Stack.Screen
            name={'MainStack'}
            component={MainStack}
            options={{ headerShown:false}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoginStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{header: () => <Header />, headerShown: true }}>
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
        name="CodeVerification" 
        component={CodeVerification}
      />
    </Stack.Navigator>
  )
}

const MainStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="TabMenu" screenOptions={{header: () => <Header />, headerShown: true }}>
      <Stack.Screen
        name={'TabMenu'}
        component={TabMenu}
      />
      <Stack.Screen
        name={'VehicleRegisterPage'}
        component={VehicleRegisterPage}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  imageIcon: {
    width: 30,
    height: 30
  }
});