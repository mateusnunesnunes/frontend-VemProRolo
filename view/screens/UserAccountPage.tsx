import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Dimensions, Image, KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api } from "../../controller";
import { ParamList } from "../../controller/routes";
import { InputForm } from "../../model/forms/InputForm";
import { colors } from "../styles/Colors";
import images from "../themes/Images";
import { User } from "./ProfilePage";

interface Props {
    navigation: StackNavigationProp<ParamList, 'UserAccountPage'>,
    route: RouteProp<ParamList, 'UserAccountPage'>,
}

interface State {
    user: User;
}

interface InputContainerProps {
    placeholder: string;
    title: string;
    inputWidth: number | string;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
    onChange?: (value: string) => void;
    value: string;
}

const InputContainer = (props: InputContainerProps): JSX.Element => {

    const { placeholder, title, inputWidth, numberOfLines, multiline, keyboardType, onChange, value } = props;
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>{title}</Text>
            <InputForm
                placeholder={placeholder}
                style={{...styles.input, width: inputWidth}} 
                hasVisibility={true}
                numerOfLines={numberOfLines}
                multiline={multiline}
                keyboardType={keyboardType}
                onChange={onChange}
                value={value}
            />
        </View>
    )
}

export default class UserAccountPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
            user: {
                name: '',
                email:'',
                phone: ''
            }
        }
      }

    componentDidMount(){
        this.fetchUser();
    }

    fetchUser = () => {
        api.get('/users/current')
        .then(response => {
            this.setState({user: response.data as User})
        })
        .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
    }

    onChangeName = (text: string) => {
        this.setState({user: { ...this.state.user, name: text }});
    }

    onChangePhone = (text: string) => {
        this.setState({user: { ...this.state.user, phone: text }});
    }

    onPressSaveButton = () => {
        const { user } = this.state;
        api.put('/users', user)
        .then(() => console.log("sucesso"))
        .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
        this.redirectToProfilePage();
    }

    redirectToProfilePage = () => {
        this.props.navigation.navigate('ProfilePage', {user: this.state.user});
    }

    onPressBackButton = () => {
        this.redirectToProfilePage();
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: colors.white}}>
                
                <View style={styles.imageContainer}>
                    <View style={styles.alignItensContainer}>
                        <TouchableOpacity style={styles.userProfileFoto}>
                            <Image source={images.addPhotoIcon} />
                        </TouchableOpacity>

                    </View>                 
                </View>
                <View style={styles.profileContainer}>
                    
                    <View style={styles.inputContainerStyle}>
                        <InputContainer
                            title='Nome'
                            placeholder='Digite seu nome...'
                            inputWidth={Dimensions.get('window').width - 20}
                            onChange={this.onChangeName.bind(this)}
                            value={this.state.user.name}
                        />
                    </View>

                    <View style={styles.inputContainerStyle}>
                        <InputContainer
                            title='Telefone'
                            placeholder='Digite seu telefone...'
                            inputWidth={Dimensions.get('window').width - 20}
                            onChange={this.onChangePhone.bind(this)}
                            value={this.state.user.phone}
                        />
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: colors.veryLightGrey}}>
                    <TouchableOpacity 
                        style={{...styles.button, backgroundColor: colors.black}}
                        onPress={this.onPressSaveButton}
                    >
                        <View>
                            <Text style={{...styles.buttonText, color: colors.white}}>Salvar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{...styles.button, backgroundColor: colors.white, borderStyle: 'solid', borderWidth: 2, borderColor: colors.black}}
                        onPress={this.onPressBackButton}
                    >
                        <View>
                            <Text style={{...styles.buttonText, color: colors.black}}>Voltar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.veryLightGrey,
        flex: 3,
        alignItems: 'center',
        padding: 20
    },
    imageContainer: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black, 
        flex: 1
    },
    userProfileFoto: {
        backgroundColor: colors.white,
        height: 120,
        width: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignItensContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    divisor: {
        height: 1,
        width: '80%',
        backgroundColor: colors.darkGrey
    },
    menuItemContainer:{
        height: 40,
        width: 350,
        backgroundColor: colors.white,
        borderRadius: 30,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'center'
        ,alignItems: 'center'
    },
    menuItemDetail: {
        width: 20, 
        height: '100%', 
        backgroundColor: colors.darkGrey,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 10,
        tintColor: colors.darkGrey
    },
    menuItemText: {
        marginLeft: 10,
        fontSize: 20,
        color: colors.darkGrey,
        fontWeight: 'bold'
    },
    button: {
        height: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        margin: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        margin: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        borderColor: colors.black,
        borderStyle: 'solid', 
        borderWidth: 2, 
        borderRadius: 5,
        marginTop: 10,
        fontSize: 16
    },
    inputContainerStyle: {
        marginTop: 20
    },
});