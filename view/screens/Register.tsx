import React, { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Keyboard  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/registerView';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import inptValidations from '../../controller/events/InputValidations';
import registerValidation from '../../controller/events/RegisterValidation';
import {InputForm} from '../../model/forms/InputForm';

export default function Register({navigation}: {navigation: any}) {

  let [validateEmail] = useState(false);
  let [validatePassword] = useState(false);
  let [validateRePassword] = useState(false);
  let [name] = useState('');

  function inputPasswordCallBack(text:string){
    validatePassword = inptValidations.validatePassword(text)
  }
  function inputNameCallBack(text:string){
    name = text;
  }
  function inputRePasswordCallBack(text:string){
    validateRePassword = inptValidations.validatePassword(text)
  }

  function inputEmailCallBack(text:string){
    validateEmail = inptValidations.validateEmail(text)
  }

  
  async function submitRegister(){
    console.log(name,validateEmail,validatePassword,validateRePassword)
    let response = await registerValidation.btnValidation(name,validateEmail,validatePassword)
    if(response){
      logIn();
    }
  }

  


  function loginRedirectPage(){
    navigation.navigate("Login");
  }
  function logIn() {
    navigation.navigate("LoggedTempPage");
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
        // some other error happened
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

  return(
    
    <SafeAreaView style={styles.container}>
        <View style={styles.divMessage}>
            <Text style={styles.wellComeMessage}>Bem vindo!</Text>
            <Text style={styles.descriptonMessage}>Se cadastrar no sistema</Text>
        </View>
        <View style={styles.containerInputLogin}>
            

            <InputForm
              placeholder="Nome"
              autoCorrect={false}
              onChange={inputNameCallBack}
              style={styles.inputLogin}
              autoCapitalize='none'
            />
            <InputForm
              placeholder="E-mail"
              autoCorrect={false}
              onChange={inputEmailCallBack}
              style={styles.inputLogin}
              textContentType='emailAddress'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCompleteType='email'
            />
            <InputForm
              placeholder="Senha"
              hasVisibility={false}
              onChange={inputPasswordCallBack}
              style={styles.inputLogin}
            />
            <InputForm
              placeholder="Senha"
              hasVisibility={false}
              onChange={inputPasswordCallBack}
              style={styles.inputLogin}
            />
          </View>

          <View style={styles.containerBtns}>
            
           <TouchableOpacity onPress={loginRedirectPage}>
              <Text style={styles.loginMessage} >Já possui uma conta? Entre</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={submitRegister} style={styles.btnLogin} >
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
