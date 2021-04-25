import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/registerView';


export default function App({navigation}: {navigation: any}) {

  function login(){
    navigation.navigate("Login");
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
