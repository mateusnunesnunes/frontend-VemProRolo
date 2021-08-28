import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Image, KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import { Dimensions, FlatList } from "react-native";
import images from "../themes/Images";
import { InputForm } from "../../model/forms/InputForm";
import ImagePicker from "react-native-image-crop-picker";
import { api } from "../../controller";

interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleRegisterPage'>,
    route: RouteProp<ParamList, 'VehicleRegisterPage'>,
}

interface State {
    vehicle: Vehicle;
    vehicleToUpdate?: Vehicle;
}

interface InputContainerProps {
    placeholder: string;
    title: string;
    inputWidth: number | string;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
    onChange?: (value: string) => void;
    value: string | undefined;
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

export interface VehicleImage {
    fileName?: string | null;
    fileContentType?: string | null;
    file?: string | null;
}

export interface Vehicle {
    id?: number,
    year: number | undefined,
    color: string,
    model: Model,
    fuelType: string,
    transmissionType: string,
    category: string,
    details: string,
    images: VehicleImage[]
    kilometers: number | undefined;
    doorsNumber: number | undefined;
}

export interface Brand {
    id?: number,
    name: string,
}

export interface Model {
    id?: number,
    name: string,
    brand: Brand
}

class VehicleRegisterPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
            vehicle: {
                model:{
                    name: '',
                    brand: {
                        name: ''
                    }
                },
                year: undefined,
                color: '',
                fuelType: '',
                transmissionType: '',
                category: '',
                details: '',
                kilometers: 0,
                doorsNumber: undefined,
                images: []
            },
            vehicleToUpdate: this.props.route.params.vehicleToUpdate
        }
    }

    fetchVehicle = (id: number) => {
        api.get('/vehicles/'+ id)
        .then(response => {
            this.setState({vehicle: response.data as Vehicle})
        })
        .catch(error => Alert.alert(error));
    }

    componentDidMount = () => {
        if (this.state.vehicleToUpdate !== undefined && this.state.vehicleToUpdate !== null) {
            this.setState({vehicle: this.state.vehicleToUpdate});
        }
    }

    onChangeYear = (text: string) => {
        if (text == ''){
            text = '0'
        }
        var number = parseInt(text , 10 );
        this.setState({vehicle: { ...this.state.vehicle, year: number }});
    }

    onChangeColor = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, color: text }});
    }

    onChangeFuelType = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, fuelType: text }});
    }
    
    onChangeTransmissionType = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, transmissionType: text }});
    }

    onChangeKilometers = (text: string) => {
        if (text == ''){
            text = '0'
        }
        var number = parseInt(text , 10 );
        this.setState({vehicle: { ...this.state.vehicle, kilometers: number }});
    }

    onChangeCategory = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, category: text }});
    }

    onChangeDetails = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, details: text }});
    }

    onChangeDoorsNumber = (text: string) => {
        if (text == ''){
            text = '0'
        }
        var number = parseInt(text , 10 );
        this.setState({vehicle: { ...this.state.vehicle, doorsNumber: number }});
    }

    onPressSaveButton = () => {
        const { vehicle } = this.state;

        if (this.state.vehicle.id) {
            api.put('/vehicles', vehicle)
            .then(() => this.redirectToVehicleList())
            .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
        } else {
            api.post('/vehicles', vehicle)
            .then(() => this.redirectToVehicleList())
            .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
        }

    }

    redirectToVehicleList = () => {
        this.props.navigation.navigate('VehiclesUser');
    }

    onPressBackButton = () => {
        this.redirectToVehicleList();
    }

    openImagePicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.7,
            maxFiles: 10,
            mediaType: 'photo',
            includeBase64: true
        })
        .then(response => {
            response.map(image => {
                this.setState(prevState => ({
                    vehicle: {
                        ...this.state.vehicle,
                        images: [...prevState.vehicle.images, {
                            file: image.data,
                            fileContentType: 'image/jpeg',
                            fileName: image.filename || "image"
                        }]
                    }
                }));
            })
        })
    }

    renderEmptyImageComponent() {
        return (
            <TouchableOpacity style={{width: Dimensions.get('window').width}} onPress={this.openImagePicker}>
                <View style={styles.imagePickerContainer}>
                    <Image source={images.cameraIcon} style={styles.imageIcon} />
                    <Text>Incluir foto</Text>
                    <Text>0 de 10 selecionadas</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderImageComponent(image: VehicleImage) {
        console.log("image: ", image);
        let imagesLength = this.state.vehicle.images.length;
        return (
            <TouchableOpacity style={{width: Dimensions.get('window').width - 100}} onPress={this.openImagePicker}>
                { imagesLength === 0 ? (
                    <View style={styles.imagePickerContainer}>
                        <Image source={images.cameraIcon} style={styles.imageIcon} />
                        <Text>Incluir foto</Text>
                        <Text>0 de 10 selecionada</Text>
                    </View>
                ) : (
                    <View style={styles.imagePickerContainer}>
                        <Image source={{uri: "data:image/jpeg;base64," + image.file, scale: 1}} style={styles.imageCar} />
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    render() {
        const { vehicle } = this.state;
        const image = vehicle?.images?.find(it => it != undefined)?.file
        return(
            <>
            <ScrollView>
                <View style={{height: 200}}>
                    <FlatList
                        horizontal
                        style={{width: '100%', flex: 1}}
                        renderItem={({item}) => this.renderImageComponent(item)} 
                        ListEmptyComponent={this.renderEmptyImageComponent()}
                        data={this.state.vehicle.images}
                        keyExtractor={(item, index) => index.toString()}
                        maxToRenderPerBatch={10}
                    />
                </View>
                <View style={{backgroundColor: colors.white}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        {/* <InputContainer
                            title='Marca'
                            placeholder='Ex. Ford'
                            inputWidth={100}
                            onChange={this.onChangeBrand.bind(this)}
                            value={this.state.vehicle.brand}
                        /> */}
                        <InputContainer
                            title='Ano'
                            placeholder='Ex. 2010'
                            inputWidth={100}
                            keyboardType={'numeric'}
                            onChange={this.onChangeYear.bind(this)}
                            value={
                                this.state.vehicle.year == null || this.state.vehicle.year == undefined || this.state.vehicle.year == 0
                                ? '0' 
                                : ''+this.state.vehicle.year
                            }
                        />
                        <InputContainer
                            title='Cor'
                            placeholder='Ex. Vermelho'
                            inputWidth={130}
                            onChange={this.onChangeColor.bind(this)}
                            value={this.state.vehicle.color}
                        />
                    </View>
                    <View>
                        {/* <InputContainer
                            title='Modelo'
                            placeholder='Ex. Fiat Uno'
                            inputWidth={Dimensions.get('window').width - 20}
                            onChange={this.onChangeModel.bind(this)}
                            value={this.state.vehicle.model}
                        /> */}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Combustível'
                            placeholder='Ex. Gasolina'
                            inputWidth={180}
                            onChange={this.onChangeFuelType.bind(this)}
                            value={this.state.vehicle.fuelType}
                        />
                        <InputContainer
                            title='Câmbio'
                            placeholder='Ex. Automático'
                            inputWidth={180}
                            onChange={this.onChangeTransmissionType.bind(this)}
                            value={this.state.vehicle.transmissionType}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Quilometragem'
                            placeholder='Ex. 54578'
                            inputWidth={180}
                            keyboardType={'numeric'}
                            onChange={this.onChangeKilometers.bind(this)}
                            value={
                                this.state.vehicle.kilometers == null || this.state.vehicle.kilometers == undefined || this.state.vehicle.kilometers == 0 || this.state.vehicle.kilometers == NaN
                                ? '0' 
                                : this.state.vehicle.kilometers.toString()
                            }
                        />
                        <InputContainer
                            title='Categoria'
                            placeholder='Ex. Sedan'
                            inputWidth={180}
                            onChange={this.onChangeCategory.bind(this)}
                            value={this.state.vehicle.category}
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
                            value={this.state.vehicle.details}
                        />
                        <InputContainer
                            title='Portas'
                            placeholder='Ex. 4'
                            inputWidth={100}
                            keyboardType={'numeric'}
                            onChange={this.onChangeDoorsNumber.bind(this)}
                            value={
                                this.state.vehicle.doorsNumber == null || this.state.vehicle.doorsNumber == undefined || this.state.vehicle.doorsNumber == 0
                                ? '0' 
                                : ''+this.state.vehicle.doorsNumber
                            }
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