import React from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/passwordRecovery';
import OtpForm from '../../model/forms/OtpForm';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ParamList } from '../../controller/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import requests from '../../controller/requestController';
import { InputForm } from '../../model/forms/InputForm';
import inptValidations from '../../controller/events/InputValidations';

interface Props {
    navigation: StackNavigationProp<ParamList, 'CodeVerification'>,
    route: RouteProp<ParamList, 'CodeVerification'>
}

interface State {
    code: string,
    email: string,
    password?: string,
    passwordError?: string
    btnDisabled: boolean
}

export default class PasswordRecovery extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    
        this.state = {
          code: '',
          email: this.props.route.params.email,
          password: '',
          btnDisabled: true,
          passwordError: ''
        }
    }

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
          this.setState({ password }, this.enableBtn);
      };

    private logIn() {
        this.props.navigation.navigate("MainStack");
    }

    private resendCode() {
        const { email } = this.state;
        requests.post("auth/password-recovery", { email })
        .then(response => Alert.alert("Um email foi enviado com um novo código de verificação"))
        .catch(err => Alert.alert("Algo deu errado"));
    }

    private async confirm() {
        const { code, email, password } = this.state;
        console.log(code, email);
        if (code == null || code.length != 6) {
            Alert.alert("Código inválido", "Preencha todos os 6 dígitos para continuar");
        } else {
            await requests.post("auth/reset-password", { email, code, password })
            .then(async response => 
                await requests.post("auth/login", { email, password })
                .then(() => this.logIn())
                .catch(err => Alert.alert("Algo deu errado"))
                )
            .catch(err => Alert.alert("Código inválido", "Não conseguimos verificar o código informado"));
        }
    }

    private onCodeChange = (code: string): void => {
        console.log(code);
        this.setState({ code }, this.enableBtn);
      };

    private enableBtn = (): void => {
        const { code, passwordError } = this.state;
        if (passwordError == undefined && code.length == 6) {
            this.setState({btnDisabled: false});
        }
    }

      render() {
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.containerMessage}>
                    <Text style={styles.codeMessage}>Mandamos um e-mail com o código de verificação da sua conta.</Text>
                </View>
    
                <OtpForm
                    onChange={this.onCodeChange.bind(this)}
                />
    
                <TouchableOpacity style={styles.containerResend} onPress={this.resendCode.bind(this)}>
                    <Text style={styles.resendText}>Reenviar</Text>
                </TouchableOpacity>


                <View style={styles.containerMessage}>
                <InputForm 
                        placeholder='Digite sua nova senha'    
                        hasVisibility={false}
                        onChange={this.onPasswordChange.bind(this)}
                        style={styles.inputPassword}
                        value={this.state.password}
                        error={this.state.passwordError}
                    />
                </View>
    
                <View style={styles.containerBtn} >
                    <TouchableOpacity style={styles.btn} onPress={this.confirm.bind(this)} disabled={this.state.btnDisabled}>
                        <Text style={styles.btnText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
      }
   
}