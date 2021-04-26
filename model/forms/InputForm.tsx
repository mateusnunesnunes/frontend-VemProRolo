import { TextInput, StyleSheet, View, ImagePropTypes, KeyboardTypeOptions, Text } from 'react-native';
import styles from '../../view/styles/views/Input/defaultInput';
import React from 'react';

interface Props {
  error?: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: object;
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?:
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'name'
  | 'password'
  | 'postal-code'
  | 'street-address'
  | 'tel'
  | 'username'
  | 'off';
  hasVisibility?: boolean;
  textContentType?:
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode';
}

interface State {
  value?: string;
  secureTextEntry?: boolean;
}

export class InputForm extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value,
      secureTextEntry: !props.hasVisibility
    }
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      value: newProps.value != null ? newProps.value : this.state.value
    });
  }

  private onChange = (value: string): void => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  private onChangeVisibility = (): void =>  {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  render() {
    const {style, autoCorrect, placeholder, autoCapitalize, textContentType, keyboardType, autoCompleteType, error} = this.props;
    const {secureTextEntry, value} = this.state;
    return (
      <>
      <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={this.onChange}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        style = {style ? style : styles.inputLogin }
        value={value}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCompleteType={autoCompleteType}
        blurOnSubmit={true}
      />
      </View>
      {error != null && <Text style={[styles.errorText]}>{error}</Text>}
      </>
    );
  }
}