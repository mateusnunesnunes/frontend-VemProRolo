import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/views/loginView';

export default function Login({navigation})  {
  

    function registerAccount(){
      console.log("registerAccount")
      navigation.navigate("Register");
    }
    function forgotPassword(){  
      navigation.navigate("PasswordRecovery");
      
    }

    return (
        <SafeAreaView style={styles.container}>
        
          <View style={styles.divMessage}>
            <Text style={styles.wellComeMessage}>Olá!</Text>
            <Text style={styles.descriptonMessage}>Entrar no sistema</Text>
          </View>

          <View style={styles.containerInputLogin}>
            <TextInput
              style={styles.inputLogin}
              placeholder="Email"
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
          </View>

          <View style={styles.containerBtns}>

            <TouchableOpacity onPress={registerAccount}>
              <Text style={styles.registerMessage} >Não possui conta? Registre-se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={forgotPassword}>
              <Text style={styles.forgotPasswordMessage} >Esqueci minha senha</Text>
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

