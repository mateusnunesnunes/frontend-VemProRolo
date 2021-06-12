import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Image, KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import { Dimensions } from "react-native";
import images from "../themes/Images";
import { InputForm } from "../../model/forms/InputForm";
import ImagePicker from "react-native-image-crop-picker";
import { api } from "../../controller";

interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleRegisterPage'>,
    route: RouteProp<ParamList, 'VehicleRegisterPage'>
}

interface State {
    vehicle: Vehicle;
}

interface InputContainerProps {
    placeholder: string;
    title: string;
    inputWidth: number | string;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
    onChange?: (value: string) => void;
}

const InputContainer = (props: InputContainerProps): JSX.Element => {

    const { placeholder, title, inputWidth, numberOfLines, multiline, keyboardType, onChange } = props;
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
            />
        </View>
    )
}

export interface VehicleImage {
    fileName?: string | null;
    fileContentType?: string | null;
    file?: string | null;
}

export interface Vehicle {
    id?: number,
    brand?: string,
    year?: number,
    color?: string,
    model?: string,
    fuelType?: string,
    transmissionType?: string,
    category?: string,
    details?: string,
    images?: VehicleImage[]
    kilometers?: number;
    doorsNumber?: number;
}

class VehicleRegisterPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
            vehicle: {
                images: []
            }
        }
      }

    onChangeBrand = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, brand: text }});
    }

    onChangeYear = (text: string) => {
        var number = parseInt(text , 10 ) + 1;
        this.setState({vehicle: { ...this.state.vehicle, year: number }});
    }

    onChangeColor = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, color: text }});
    }

    onChangeModel = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, model: text }});
    }

    onChangeFuelType = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, fuelType: text }});
    }
    
    onChangeTransmissionType = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, transmissionType: text }});
    }

    onChangeKilometers = (text: string) => {
        var number = parseInt(text , 10 ) + 1;
        this.setState({vehicle: { ...this.state.vehicle, kilometers: number }});
    }

    onChangeCategory = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, category: text }});
    }

    onChangeDetails = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, details: text }});
    }

    onChangeDoorsNumber = (text: string) => {
        var number = parseInt(text , 10 ) + 1;
        this.setState({vehicle: { ...this.state.vehicle, doorsNumber: number }});
    }

    onPressSaveButton = () => {
        const { vehicle } = this.state;
        api.post('/vehicles', vehicle)
        .then(() => this.redirectToVehicleList())
        .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
    }

    redirectToVehicleList = () => {
        // TODO redirect to vehicle list
    }

    onPressBackButton = () => {
        this.redirectToVehicleList();
    }

    openImagePicker = () => {
        ImagePicker.openPicker({
            multiple: false,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 1,
            mediaType: 'photo',
            includeBase64: true
        })
        .then(response => {
            //response.map(image => {
                this.setState({
                    vehicle: {
                        ...this.state.vehicle,
                        images: [{
                            file: response.data,
                            fileContentType: 'image/jpeg',
                            fileName: response.filename || "image"
                        }]
                    }
                });
            //})
        })
    }
    render() {
        const { vehicle } = this.state;
        const image = vehicle?.images?.find(it => it != undefined)?.file
        return(
            <>
            <ScrollView>
                <View style={{height: 200}}>
                    <TouchableOpacity onPress={this.openImagePicker}
                    >
                        { image == null ? (
                            <View style={styles.imagePickerContainer}>
                                <Image source={images.cameraIcon} style={styles.imageIcon} />
                                <Text>Incluir foto</Text>
                                <Text>0 de 1 selecionada</Text>
                            </View>
                        ) : (
                            <View style={styles.imagePickerContainer}>
                                <Image source={{uri: "data:image/jpeg;base64," + image, scale: 1}} style={styles.imageCar} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: colors.white}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Marca'
                            placeholder='Ex. Ford'
                            inputWidth={100}
                            onChange={this.onChangeBrand.bind(this)}
                        />
                        <InputContainer
                            title='Ano'
                            placeholder='Ex. 2010'
                            inputWidth={100}
                            keyboardType={'numeric'}
                            onChange={this.onChangeYear.bind(this)}
                        />
                        <InputContainer
                            title='Cor'
                            placeholder='Ex. Vermelho'
                            inputWidth={130}
                            onChange={this.onChangeColor.bind(this)}
                        />
                    </View>
                    <View>
                        <InputContainer
                            title='Modelo'
                            placeholder='Ex. Fiat Uno'
                            inputWidth={Dimensions.get('window').width - 20}
                            onChange={this.onChangeModel.bind(this)}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Combustível'
                            placeholder='Ex. Gasolina'
                            inputWidth={180}
                            onChange={this.onChangeFuelType.bind(this)}
                        />
                        <InputContainer
                            title='Câmbio'
                            placeholder='Ex. Automático'
                            inputWidth={180}
                            onChange={this.onChangeTransmissionType.bind(this)}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Quilometragem'
                            placeholder='Ex. 54578'
                            inputWidth={180}
                            keyboardType={'numeric'}
                            onChange={this.onChangeKilometers.bind(this)}
                        />
                        <InputContainer
                            title='Categoria'
                            placeholder='Ex. Sedan'
                            inputWidth={180}
                            onChange={this.onChangeCategory.bind(this)}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Detalhes'
                            placeholder='Ex. Lataria impecável, motor revisado e rodas novas'
                            inputWidth={220}
                            numberOfLines={5}
                            multiline={true}
                            onChange={this.onChangeDetails.bind(this)}
                        />
                        <InputContainer
                            title='Portas'
                            placeholder='Ex. 4'
                            inputWidth={100}
                            keyboardType={'numeric'}
                            onChange={this.onChangeDoorsNumber.bind(this)}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor:colors.white}}>
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
            </>
        );
    }
}

const styles = StyleSheet.create({
    imageIcon: {
      width: 30,
      height: 30
    },
    imageCar: {
        width: '100%',
        height: 156,
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