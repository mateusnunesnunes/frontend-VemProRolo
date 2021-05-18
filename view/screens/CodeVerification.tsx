import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/passwordRecovery';
import OtpForm from '../../model/forms/OtpForm';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ParamList } from '../../controller/routes';
import { StackNavigationProp } from '@react-navigation/stack';

export interface CodeVerificationProps {
    navigation: StackNavigationProp<ParamList, 'CodeVerification'>
    route: RouteProp<ParamList, 'CodeVerification'>
}

const CodeVerification: React.FC<CodeVerificationProps> = ({ navigation, route }) => {

    const { email } = route.params;
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.containerMessage}>
                <Text style={styles.codeMessage}>Mandamos um e-mail com o código de verificação da sua conta.</Text>
            </View>

            <OtpForm></OtpForm>

            <TouchableOpacity style={styles.containerResend}>
                <Text style={styles.resendText}>Reenviar</Text>
            </TouchableOpacity>

            <View style={styles.containerBtn} >
                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
  }

export default CodeVerification;