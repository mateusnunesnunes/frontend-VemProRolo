import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/loginView';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';

export default function LoggedTempPage({navigation}: {navigation: any})  {

    useEffect(() => {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '760992990537-i8bbh903gjl8dfuo6uh6inod8uicgj9q.apps.googleusercontent.com',
          iosClientId: '760992990537-7rtdspl7n33j1pbeg7nl2nvcc05prfje.apps.googleusercontent.com',
        offlineAccess: true
      });
    }, []);

    async function signOut() {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        navigation.navigate("Login");
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.divMessage}>
            <Text style={styles.wellComeMessage}>Olá!</Text>
            <Text style={styles.descriptonMessage}>Você está logado no nosso sistema</Text>
          </View>   
          <TouchableOpacity onPress={signOut} style={styles.btnLogin} >
              <Text style={styles.btnLoginText} >Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  }

