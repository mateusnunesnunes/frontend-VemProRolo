import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/changePassword.js';


export default function ChangePassword(){
    return (
        <SafeAreaView style={styles.container}>
        
          <View style={styles.divMessage}>
            <Text style={styles.wellComeMessage}>Redefinir Senha</Text>
            <Text style={styles.descriptonMessage}>Redefina sua senha</Text>
          </View>

          <View style={styles.containerInputLogin}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputLogin}
              placeholder="Nova senha"
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
            <TouchableOpacity style={styles.btnLogin} >
              <Text style={styles.btnLoginText} >Entrar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }

