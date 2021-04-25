import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/loginView';
import InputForm from '../../model/forms/InputForm';
import inptValidations from '../../controller/events/InputValidations';
import loginValidation from '../../controller/events/LoginValidation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { LoginManager } from 'react-native-fbsdk-next';

export default function Login({navigation}: {navigation: any})  {

    let [validateEmail] = useState(false);
    let [validatePassword] = useState(false);

    useEffect(() => {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '760992990537-i8bbh903gjl8dfuo6uh6inod8uicgj9q.apps.googleusercontent.com',
          iosClientId: '760992990537-7rtdspl7n33j1pbeg7nl2nvcc05prfje.apps.googleusercontent.com',
        offlineAccess: true
      });
    }, []);

    function registerAccount(){
      navigation.navigate("Register");
    }
    function forgotPassword(){  
      navigation.navigate("PasswordRecovery");
    }
    function logIn() {
      navigation.navigate("LoggedTempPage");
    }

    function inputEmailCallBack(text:string){
      validateEmail = inptValidations.validateEmail(text);
    }

    function inputPasswordCallBack(text:string){
      validatePassword = inptValidations.validatePassword(text);
    }
    
    function submitCredentials(){
      if (loginValidation.btnValidation(validateEmail,validatePassword)) {
        logIn();
      }
    }

    async function googleSignIn(){
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        logIn();
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('Cancel');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Signin in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('PLAY_SERVICES_NOT_AVAILABLE');
        } else {
          console.log('Unknow error');
        }
      }
    }

    async function facebookSignIn(){
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result) {
        if (result.isCancelled) {
        console.log("Login Cancelled " + JSON.stringify(result))
        } else {
          console.log("Login success with  permisssions: " + result.grantedPermissions?.toString());
          console.log("Login Success " + result.toString());
          logIn();
        }
        },
        function (error) {
          console.log("Login failed with error: " + error);
        }
        )
    }

    return (
        <SafeAreaView style={styles.container}>
          

          <View style={styles.divMessage}>
            <Text style={styles.wellComeMessage}>Olá!</Text>
            <Text style={styles.descriptonMessage}>Entrar no sistema</Text>
          </View>
          <View style={styles.containerInputLogin}>

            <InputForm
              placeholder="E-mail"
              autoCorrect={false}
              handler={inputEmailCallBack}
              style={styles.inputLogin}
              textContentType='emailAddress'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCompleteType='email'
            />
            
            <InputForm
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry={true}
              handler={inputPasswordCallBack}
              style={styles.inputLogin}
            />
            
              
          </View>

          <View style={styles.containerBtns}>

            <TouchableOpacity onPress={registerAccount}>
              <Text style={styles.registerMessage} >Não possui conta? Registre-se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={forgotPassword}>
              <Text style={styles.forgotPasswordMessage} >Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={submitCredentials} style={styles.btnLogin} >
              <Text style={styles.btnLoginText} >Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.lineSocialMedia}>_______________Ou_______________</Text>
            <View style={styles.containerimgSocialMedias}>
              <TouchableOpacity onPress={googleSignIn}>
                <Image style={styles.imgSocialMedias} source={require('../../model/imgs/google.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={facebookSignIn}>
                <Image style={styles.imgSocialMedias} source={require('../../model/imgs/facebook.png')}/>
              </TouchableOpacity>
              
            </View>
            
          </View>
    
            
        </SafeAreaView>
    );
  }

