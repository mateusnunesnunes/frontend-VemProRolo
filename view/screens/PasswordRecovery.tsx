import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/passwordRecovery';
import OtpForm from '../../model/forms/OtpForm';
export default function PasswordRecovery(){

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerMessage}>
                <Text style={styles.codeMessage}>Mandamos um e-mail com o código de recuperação da sua conta.</Text>
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

