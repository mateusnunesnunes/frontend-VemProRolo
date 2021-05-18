import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/loginView';
import {InputForm} from '../../model/forms/InputForm';
import inptValidations from '../../controller/events/InputValidations';
import loginValidation from '../../controller/events/LoginValidation';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { LoginManager } from 'react-native-fbsdk-next';
import { StackNavigationProp } from '@react-navigation/stack';


interface Props {
  navigation: StackNavigationProp<any, any>;
}
interface State {
  email?: string;
  emailError?: string;
  password?: string;
  passwordError?: string;
  loginError?: boolean;
  changeAccountError?: string;
  isLoading?: boolean;
  keyboardVerticalOffset?: number;
}
GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId:
    '760992990537-i8bbh903gjl8dfuo6uh6inod8uicgj9q.apps.googleusercontent.com',
    iosClientId: '760992990537-7rtdspl7n33j1pbeg7nl2nvcc05prfje.apps.googleusercontent.com',
  offlineAccess: true
});
export class Login extends React.Component<Props, State>  {

    constructor(props: Props) {
      super(props);

      this.state = {
        email: '',
        password: '',
      }
    }
    private registerAccount(){
      this.props.navigation.navigate("Register");
    }
    private forgotPassword(){  
      this.props.navigation.navigate("PasswordRecovery");
    }
    private logIn() {
      this.props.navigation.navigate("LoggedTempPage");
    }
    
    private onEmailChange = (email?: string): void => {
      if (email == null || email.length === 0) {
        this.setState(
            {
                emailError: 'Preencha o email'
            }
        );
    } else if (!inptValidations.validateEmail(email)) {
        this.setState(
            {
              emailError: 'Email inválido'
            }
        );
    } else {
        this.setState({ emailError: undefined});
    }
      this.setState({ email });
    };
    private onPasswordChange = (password?: string): void => {
      if (password == null || password.length === 0) {
        this.setState(
            {
                passwordError: 'Preencha a senha'
            }
        );
    } else if (!inptValidations.validatePassword(password)) {
        this.setState(
            {
              passwordError: 'A senha precisa ter no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula e um número'
            }
        );
    } else {
        this.setState({ passwordError: undefined});
    }
        this.setState({ password });
    };

    private async submitCredentials(){
      const {email, password, emailError, passwordError} = this.state;
      console.log(emailError, passwordError)
      if (emailError === undefined && passwordError === undefined) {
        await loginValidation.btnValidation(email,password)
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        })
      }
    }

    private async googleSignIn(){
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        this.logIn();
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

    private async facebookSignIn(){
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
         (result) => {
        if (result.isCancelled) {
        console.log("Login Cancelled " + JSON.stringify(result))
        } else {
          console.log("Login success with  permisssions: " + result.grantedPermissions?.toString());
          console.log("Login Success " + result.toString());
          this.logIn();
        }
        },
        function (error) {
          console.log("Login failed with error: " + error);
        }
        )
    }

    render() {
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
              onChange={this.onEmailChange}
              value={this.state.email}
              style={styles.inputLogin}
              textContentType='emailAddress'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCompleteType='email'
              error={this.state.emailError}
              hasVisibility={true}
            />
            
            <InputForm
              placeholder="Senha"
              autoCorrect={false}
              hasVisibility={false}
              onChange={this.onPasswordChange}
              style={styles.inputLogin}
              value={this.state.password}
              error={this.state.passwordError}
            />
            
              
          </View>

          <View style={styles.containerBtns}>

            <TouchableOpacity onPress={this.registerAccount.bind(this)}>
              <Text style={styles.registerMessage} >Não possui conta? Registre-se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.forgotPassword.bind(this)}>
              <Text style={styles.forgotPasswordMessage} >Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.submitCredentials.bind(this)} style={styles.btnLogin} >
              <Text style={styles.btnLoginText} >Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.lineSocialMedia}>_______________Ou_______________</Text>
            <View style={styles.containerimgSocialMedias}>
              <TouchableOpacity onPress={this.googleSignIn.bind(this)}>
                  <Image style={styles.imgSocialMedias} source={require('../../model/imgs/google.png')}/>
              </TouchableOpacity>
                <TouchableOpacity onPress={this.facebookSignIn.bind(this)}>
                  <Image style={styles.imgSocialMedias} source={require('../../model/imgs/facebook.png')}/>
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
    );
    }
   
  }

