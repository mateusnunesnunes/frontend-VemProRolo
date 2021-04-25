import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/registerView';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Register({navigation}: {navigation: any}) {

  function login(){
    navigation.navigate("Login");
  }

  async function signIn(){
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return(
    
    <SafeAreaView style={styles.container}>
        <View style={styles.divMessage}>
            <Text style={styles.wellComeMessage}>Bem vindo!</Text>
            <Text style={styles.descriptonMessage}>Se cadastrar no sistema</Text>
        </View>
        <View style={styles.containerInputLogin}>
            

            <TextInput
              style={styles.inputLogin}
              placeholder="Nome"
              autoCorrect={false}
              onChangeText={()=>{}}
            />
            <TextInput             
              style={styles.inputLogin}
              placeholder="E-mail"
              autoCorrect={false}
              onChangeText={()=>{}}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputLogin}
              placeholder="Senha"
              autoCorrect={false}
              onChangeText={()=>{}}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputLogin}
              placeholder="Repita a senha"
              autoCorrect={false}
              onChangeText={()=>{}}
            />
          </View>

          <View style={styles.containerBtns}>
            
           <TouchableOpacity onPress={login}>
              <Text style={styles.loginMessage} >Já possui uma conta? Entre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogin} >
              <Text style={styles.btnLoginText} >Entrar</Text>
            </TouchableOpacity>
            

            <Text style={styles.lineSocialMedia}>_______________Ou_______________</Text>
            <View style={styles.containerimgSocialMedias}>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              />
              <TouchableOpacity>
                <Image style={styles.imgSocialMediasApple} source={require('../../model/imgs/apple.png')}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.imgSocialMedias} source={require('../../model/imgs/facebook.png')}/>
              </TouchableOpacity>
            </View>
          </View>
    </SafeAreaView>
    
  );
}
