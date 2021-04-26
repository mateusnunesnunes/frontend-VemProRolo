import React, { useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Keyboard  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/registerView';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager } from 'react-native-fbsdk-next';
import inptValidations from '../../controller/events/InputValidations';
import registerValidation from '../../controller/events/RegisterValidation';
import {InputForm} from '../../model/forms/InputForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
interface Props {
  navigation: StackNavigationProp<any, any>;
}
interface State {
  name?: string;
  nameError?: string;
  email?: string;
  emailError?: string;
  password?: string;
  passwordError?: string;
  repeatPassword?: string;
  repeatPasswordError?: string;
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
export class Register extends React.Component<Props, State>  {

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword:''
    }
  }

  private onNameChange = (name?: string): void => {
    if (name == null || name.length === 0) {
      this.setState(
          {
              nameError: 'Preencha o email'
          }
      );
  } else {
      this.setState({ nameError: undefined});
  }
    this.setState({ name });
  };

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

  private onRepeatPasswordChange = (repeatPassword?: string): void => {
    const {password} = this.state;
    if (repeatPassword == null || repeatPassword.length === 0) {
      this.setState(
          {
            repeatPasswordError: 'Confirme a senha novamente'
          }
      );
  } else if (repeatPassword != password) {
      this.setState(
          {
            repeatPasswordError: 'As senhas não conferem'
          }
      );
  } else {
      this.setState({ repeatPasswordError: undefined});
  }
      this.setState({ repeatPassword });
  };

  private async submitRegister(){
    const {name, email, password, repeatPassword} = this.state;
    let response = await registerValidation.btnValidation(name,email,password)
    if(response){
      this.logIn();
    }
  }

  private loginRedirectPage(){
    this.props.navigation.navigate("Login");
  }
  private logIn() {
    this.props.navigation.navigate("LoggedTempPage");
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
        // some other error happened
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
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.divMessage}>
              <Text style={styles.wellComeMessage}>Bem vindo!</Text>
              <Text style={styles.descriptonMessage}>Se cadastrar no sistema</Text>
          </View>
          <View style={styles.containerInputLogin}>
              
  
              <InputForm
                placeholder="Nome"
                autoCorrect={false}
                onChange={this.onNameChange.bind(this)}
                style={styles.inputLogin}
                autoCapitalize='none'
                value={this.state.name}
                error={this.state.nameError}
                hasVisibility={true}
              />
              <InputForm
                placeholder="E-mail"
                autoCorrect={false}
                onChange={this.onEmailChange.bind(this)}
                style={styles.inputLogin}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCompleteType='email'
                value={this.state.email}
                error={this.state.emailError}
                hasVisibility={true}
              />
              <InputForm
                placeholder="Senha"
                hasVisibility={false}
                onChange={this.onPasswordChange.bind(this)}
                style={styles.inputLogin}
                value={this.state.password}
                error={this.state.passwordError}
              />
              <InputForm
                placeholder="Repetir senha"
                hasVisibility={false}
                onChange={this.onRepeatPasswordChange.bind(this)}
                style={styles.inputLogin}
                value={this.state.repeatPassword}
                error={this.state.repeatPasswordError}
              />
            </View>
  
            <View style={styles.containerBtns}>
              
             <TouchableOpacity onPress={this.loginRedirectPage.bind(this)}>
                <Text style={styles.loginMessage} >Já possui uma conta? Entre</Text>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={this.submitRegister.bind(this)} style={styles.btnLogin} >
                <Text style={styles.btnLoginText} >Entrar</Text>
              </TouchableOpacity>
            
              <Text style={styles.lineSocialMedia}>_______________Ou_______________</Text>
              <View style={styles.containerimgSocialMedias}>
                <TouchableOpacity onPress={this.googleSignIn}>
                    <Image style={styles.imgSocialMedias} source={require('../../model/imgs/google.png')}/>
                </TouchableOpacity>
                  <TouchableOpacity onPress={this.facebookSignIn.bind(this)}>
                    <Image style={styles.imgSocialMedias} source={require('../../model/imgs/facebook.png')}/>
                  </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
      </View>
    );
  }
  
}
