import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../view/screens/Login';
import PasswordRecovery from '../view/screens/PasswordRecovery';
import {Register} from '../view/screens/Register';
import CodeVerification from '../view/screens/CodeVerification';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import LikePage from '../view/screens/LikePage';
import ProfilePage, { User } from '../view/screens/ProfilePage';
import CommercialPage from '../view/screens/CommercialPage';
import { Image, StyleSheet } from 'react-native';
import images from '../view/themes/Images';
import { colors } from '../view/styles/Colors';
import Header  from '../components/Header';
import { Vehicle, VehicleRegisterPage } from '../view/screens/VehicleRegisterPage';
import LikeList from '../view/screens/LikeList';
import UserAccountPage from '../view/screens/UserAccountPage';
import VehiclesUser from '../view/screens/VehiclesUser';
import FilterScreen from '../view/screens/FilterScreen'
import MatchScreen from '../view/screens/MatchScreen';
import MatchModal from '../model/forms/MatchModal'
import VehicleSaleDatails from '../model/forms/VehicleSaleDatails'
import FilterScreenAnnouncement from '../view/screens/FilterScreenAnnouncement'
export type ParamList = {
  Login: undefined,
  Register: undefined,
  PasswordRecovery: undefined,
  LoggedTempPage: undefined,
  CodeVerification: {
    email: string;
    password: string;
  },
  TabMenu: undefined;
  CommercialPage: undefined;
  LikePage: undefined;
  ProfilePage: {
    user: User
  };
  MainStack: undefined;
  LoginStack: undefined;
  VehicleRegisterPage: {
    vehicleToUpdate?: Vehicle
  };
  UserAccountPage: undefined;
  VehiclesUser: undefined;
  FilterScreen: {
    onGoBack: (brandId: number, modelId: number) => void
  };
  MatchScreen: undefined;
  MatchModal: {
    item:any
  };
  VehicleSaleDatails: {
    item:any
  };
  Header: {
    navigation: any
  };
  FilterScreenAnnouncement:{
    onGoBack: (
      brandId: any,
      modelId: any,
      selectedDoors: any,
      searchText: any,
      selectedMinPrice: any,
      selectedMaxPrice: any,
      selectedMaxKm: any,
      selectedMinKm:any
      ) => void
  };
  
};

const Stack = createStackNavigator<ParamList>();
const Tab = createBottomTabNavigator();


const TabMenu = (): JSX.Element => {
  return (
    <Tab.Navigator 
      initialRouteName={'LikePage'}
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
        component={LikeList} 
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
        <Stack.Navigator initialRouteName="LoginStack">
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
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{header: ({ navigation }) => 
      <Header
        navigation={navigation}
      >
          
      </Header>, 
      headerShown: true 
    }}>
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
    <Stack.Navigator initialRouteName="TabMenu" screenOptions={{header: ({ navigation }) => 
    <Header
      navigation={navigation}
    >
        
    </Header>, headerShown: true }}>
      <Stack.Screen
        name={'TabMenu'}
        component={TabMenu}
      />
      <Stack.Screen
        name={'VehicleRegisterPage'}
        component={VehicleRegisterPage}
      />
  
      <Stack.Screen
        name={'UserAccountPage'}
        component={UserAccountPage}
      />
      <Stack.Screen
        name={'VehiclesUser'}
        component={VehiclesUser}
      />
      <Stack.Screen
        name={'FilterScreen'}
        component={FilterScreen}
      />
      <Stack.Screen
      name={'FilterScreenAnnouncement'}
      component={FilterScreenAnnouncement}
    />
       <Stack.Screen
        name={'MatchScreen'}
        component={MatchScreen}
      />
      <Stack.Screen
        name={'MatchModal'}
        component={MatchModal}
      />
      <Stack.Screen
        name={'VehicleSaleDatails'}
        component={VehicleSaleDatails}
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