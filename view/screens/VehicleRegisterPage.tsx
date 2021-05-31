import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import { Dimensions } from "react-native";
import images from "../themes/Images";
import { InputForm } from "../../model/forms/InputForm";

interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleRegisterPage'>,
    route: RouteProp<ParamList, 'VehicleRegisterPage'>
}

interface State {
}

interface InputContainerProps {
    placeholder: string;
    title: string;
    inputWidth: number | string;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
}

const InputContainer = (props: InputContainerProps): JSX.Element => {

    const { placeholder, title, inputWidth, numberOfLines, multiline, keyboardType } = props;
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
            />
        </View>
    )
}

class VehicleRegisterPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
        }
      }
    render() {
        return(
            <>
            <ScrollView>
                <View style={{height: 200}}>
                    <TouchableOpacity
                    >
                        <View style={styles.imagePickerContainer}>
                            <Image source={images.cameraIcon} style={styles.imageIcon} />
                            <Text>Incluir fotos</Text>
                            <Text>0 de 6 selecionadas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: colors.white}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Marca'
                            placeholder='Ex. Ford'
                            inputWidth={100}
                        />
                        <InputContainer
                            title='Ano'
                            placeholder='Ex. 2010'
                            inputWidth={100}
                            keyboardType={'numeric'}
                        />
                        <InputContainer
                            title='Cor'
                            placeholder='Ex. Vermelho'
                            inputWidth={130}
                        />
                    </View>
                    <View>
                        <InputContainer
                            title='Modelo'
                            placeholder='Ex. Fiat Uno'
                            inputWidth={Dimensions.get('window').width - 20}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Combustível'
                            placeholder='Ex. Gasolina'
                            inputWidth={180}
                        />
                        <InputContainer
                            title='Câmbio'
                            placeholder='Ex. Automático'
                            inputWidth={180}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Quilometragem'
                            placeholder='Ex. 54578'
                            inputWidth={180}
                            keyboardType={'numeric'}
                        />
                        <InputContainer
                            title='Categoria'
                            placeholder='Ex. Sedan'
                            inputWidth={180}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Detalhes'
                            placeholder='Ex. Lataria impecável, motor revisado e rodas novas'
                            inputWidth={220}
                            numberOfLines={5}
                            multiline={true}
                        />
                        <InputContainer
                            title='Portas'
                            placeholder='Ex. 4'
                            inputWidth={100}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor:colors.white}}>
                <TouchableOpacity style={{...styles.button, backgroundColor: colors.black}}>
                    <View>
                        <Text style={{...styles.buttonText, color: colors.white}}>Salvar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.button, backgroundColor: colors.white, borderStyle: 'solid', borderWidth: 2, borderColor: colors.black}}>
                    <View>
                        <Text style={{...styles.buttonText, color: colors.black}}>Voltar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    imageIcon: {
      width: 30,
      height: 30
    },
    imagePickerContainer: {
        borderColor: colors.black, 
        borderStyle: 'solid', 
        borderWidth: 2, 
        height:160, 
        margin: 20, 
        alignItems: 'center',
        justifyContent: 'center'
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
    }
});

export {VehicleRegisterPage, InputContainer}