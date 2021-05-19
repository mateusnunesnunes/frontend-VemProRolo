import { View, TextInput } from 'react-native';
import React from 'react';
import styles from '../../view/styles/views/passwordRecovery';

interface Props {
  onChange: (code: string) => void;
}

interface State {
  code: string;
  input1value: string;
  input2value: string;
  input3value: string;
  input4value: string;
  input5value: string;
  input6value: string;
}

export default class OtpForm extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.state = {
          code: '',
          input1value: '',
          input2value: '',
          input3value: '',
          input4value: '',
          input5value: '',
          input6value: ''
        }
    } 

    inputRef = React.createRef<TextInput>();
    inputRef2 = React.createRef<TextInput>();
    inputRef3 = React.createRef<TextInput>();
    inputRef4 = React.createRef<TextInput>();
    inputRef5 = React.createRef<TextInput>();
    inputRef6 = React.createRef<TextInput>();

    _goNextAfterEdit(input: React.RefObject<TextInput> | null){
      if (!!input){
        input.current!.focus();
      }
      const { input1value, input2value, input3value, input4value, input5value, input6value } = this.state;
      var code = input1value + input2value + input3value + input4value + input5value + input6value;
      this.setState({ code }, () => this.onChange(code))
    }

    private onChange = (code: string): void => {
      this.props.onChange(code);
    }

    render(){
     return (
      <View>
      <View style={styles.containerInput}>
        <TextInput keyboardType="numeric" style={styles.iput} value={this.state.input1value} onChangeText={input1value => this.setState({input1value}, () => this._goNextAfterEdit(this.inputRef2))} ref={this.inputRef} maxLength={1} />
        <TextInput keyboardType="numeric" style={styles.iput} value={this.state.input2value} onChangeText={input2value => this.setState({input2value}, () => this._goNextAfterEdit(this.inputRef3))} ref={this.inputRef2} maxLength={1} />
        <TextInput keyboardType="numeric" style={styles.iput} value={this.state.input3value} onChangeText={input3value => this.setState({input3value}, () => this._goNextAfterEdit(this.inputRef4))} ref={this.inputRef3} maxLength={1} />
        <TextInput keyboardType="numeric" style={styles.iput} value={this.state.input4value} onChangeText={input4value => this.setState({input4value}, () => this._goNextAfterEdit(this.inputRef5))} ref={this.inputRef4} maxLength={1} />
        <TextInput keyboardType="numeric" style={styles.iput} value={this.state.input5value} onChangeText={input5value => this.setState({input5value}, () => this._goNextAfterEdit(this.inputRef6))} ref={this.inputRef5} maxLength={1} />
        <TextInput keyboardType="numeric" style={styles.iput} value={this.state.input6value} onChangeText={input6value => this.setState({input6value}, () => this._goNextAfterEdit(null))} ref={this.inputRef6} maxLength={1} />
      </View>
    </View>
     );
   }
}