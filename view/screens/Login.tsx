import React, { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/loginView';
import InputForm from '../../model/forms/InputForm';
import inptValidations from '../../controller/events/InputValidations';
import loginValidation from '../../controller/events/LoginValidation';

export default function Login({navigation}: {navigation: any})  {

    let [validateEmail] = useState(false);
    let [validatePassword] = useState(false);

    function registerAccount(){
      navigation.navigate("Register");
    }
    function forgotPassword(){  
      navigation.navigate("PasswordRecovery");
      
    }

    function inputEmailCallBack(text:string){
      validateEmail = inptValidations.validateEmail(text);
    }

    function inputPasswordCallBack(text:string){
      validatePassword = inptValidations.validatePassword(text);
    }
    
    function submitCredentials(){
      loginValidation.btnValidation(validateEmail,validatePassword);
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
              <TouchableOpacity>
                <Image style={styles.imgSocialMedias} source={require('../../model/imgs/google.png')}/>
              </TouchableOpacity>
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

