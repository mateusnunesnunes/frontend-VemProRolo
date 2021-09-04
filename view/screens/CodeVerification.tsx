import React from 'react';
import { Text, View, TouchableOpacity, Alert  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/passwordRecovery';
import OtpForm from '../../model/forms/OtpForm';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ParamList } from '../../controller/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import requests from '../../controller/requestController';
import { InputForm } from '../../model/forms/InputForm';
import { setApiToken } from '../../controller';

interface Props {
    navigation: StackNavigationProp<ParamList, 'CodeVerification'>,
    route: RouteProp<ParamList, 'CodeVerification'>
}

interface State {
    code: string,
    email: string,
    password: string
}

export default class CodeVerification extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    
        this.state = {
          code: '',
          email: this.props.route.params.email,
          password: this.props.route.params.password
        }
    }

    private logIn() {
        this.props.navigation.navigate("MainStack");
    }

    private resendCode() {
        const { email } = this.state;
        requests.post("auth/resend-code", { email })
        .then(response => Alert.alert("Um email foi enviado com um novo código de verificação"))
        .catch(err => Alert.alert("Algo deu errado"));
    }

    private async confirm() {
        const { code, email, password } = this.state;
        console.log(code, email);
        if (code == null || code.length != 6) {
            Alert.alert("Código inválido", "Preencha todos os 6 dígitos para continuar");
        } else {
            await requests.post("auth/verify-email", { email, code })
            .then(response => {
                if (password != undefined && password != '') {
                    requests.post("auth/login", { email, password })
                    .then(responseLogin => {
                        if (responseLogin.data?.accessToken?.jwtToken) {
                            setApiToken(responseLogin.data.accessToken.jwtToken);
                            this.logIn();
                        }
                    }
                   )
                    .catch(err => Alert.alert("Algo deu errado"))
                } else {
                    Alert.alert("Email verificado!", "Volte à página de login",
                    [
                        {
                            text: 'Voltar',
                            onPress: () => this.props.navigation.goBack(),
                        }
                    ]
                    )
                }
                
            })
            .catch(err => Alert.alert("Código inválido", "Não conseguimos verificar o código informado"));
        }
    }

    private onCodeChange = (code: string): void => {
        console.log(code);
        this.setState({ code });
      };

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
    
                <View style={styles.containerBtn} >
                    <TouchableOpacity style={styles.btn} onPress={this.confirm.bind(this)} >
                        <Text style={styles.btnText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
      }
   
  }