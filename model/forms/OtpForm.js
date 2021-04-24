import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Image  } from 'react-native';
import React, {Component} from 'react';
import styles from '../../view/styles/views/passwordRecovery';

export default class OtpForm extends React.Component {
    constructor(props){
        super(props)
        this.inputRefs = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
            React.createRef()
        ]
    }

    _goNextAfterEdit(index){
        console.log(index)
        if(index < this.inputRefs.length - 1) {
          this.inputRefs[index+1].focus()
        }
      }

    render(){
     return (
       <View>
         <Text>Enter OTP</Text>
         <View style={styles.containerInput}>
          {
            this.inputRefs.map((k, idx) => (
              <TextInput keyboardType="numeric" style={styles.iput} onChange={() => this._goNextAfterEdit(idx)} ref={r => this.inputRefs[idx] =  r} maxLength={1} />
            ))
          }
         </View>
       </View>
     )
   }
}