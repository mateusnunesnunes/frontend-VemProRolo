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
import {Picker} from '@react-native-community/picker';

interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleRegisterPage'>,
    route: RouteProp<ParamList, 'VehicleRegisterPage'>,
}

interface State {
    vehicle: Vehicle;
    vehicleToUpdate?: Vehicle;
    optionsBrand: any;
    modelsEnabled: boolean;
    optionModels: any;
    selectedBrand: any;
    selectedModel: any;
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
    isLast: boolean;
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
                    id: 0,
                    name: '',
                    brand: {
                        id: 0,
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
            vehicleToUpdate: this.props.route.params.vehicleToUpdate,
            optionsBrand: [],
            modelsEnabled: false,
            optionModels: [],
            selectedModel: 0,
            selectedBrand: 0
        }
    }

    fetchVehicle = (id: number) => {
        api.get('/vehicles/'+ id)
        .then(response => {
            this.setState({vehicle: response.data as Vehicle})
        })
        .catch(error => Alert.alert(error));
    }

    getBrands = () =>{
        api.get('/brands/allBrands')
            .then(response => {
                this.setState({ optionsBrand: response.data }, () => {
                    this.state.optionsBrand.unshift({"id": 0, "name": "Selecione uma marca..."})
                    if (this.state.vehicle.id === undefined) {
                        this.setState({selectedBrand:0});
                    }
                    
                })
                
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
    }

    getAllModels = () =>{
        if(this.state.selectedBrand == 0) {
            api.get('/models/allModels')
            .then(response => {
                this.setState({optionModels : response.data}, () => {
                    this.state.optionModels.unshift({"id": 0, "name": "Selecione um modelo..."});
                    this.setState({selectedModel:0});
                })
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
        }
        else{
            this.setState({optionModels: []}, () => {
                api.get('/models/allModelsByBrand/'+this.state.selectedBrand)
                .then(response => {
                    this.setState({optionModels : response.data}, () => {
                        this.state.optionModels.unshift({"id": 0, "name": "Selecione um modelo..."});
                        this.setState({selectedModel:0});
                    })
                })
                .catch(error => console.log("Algo deu errado", "Erro Interno"));
            });
            
        }
        
    }

    componentDidMount = () => {
        this.getBrands();
        
        if (this.state.vehicleToUpdate !== undefined && this.state.vehicleToUpdate !== null) {
            this.setState({vehicle: {...this.state.vehicleToUpdate,
                images: [...this.state.vehicleToUpdate.images.filter(it => !it.isLast), {
                    file: "",
                    fileContentType: 'image/jpeg',
                    fileName: "",
                    isLast: true
                }]}}, () => {
                    let index = this.state.optionModels
                    .findIndex((it: any) => it.id === this.state.vehicle.model.id);
                    console.log("INDICE " +index)
                    this.setState({selectedModel: index})
                });
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
        if (text == '') {
            text = '0'
        }
        var number = parseInt(text , 10 );
        this.setState({vehicle: { ...this.state.vehicle, doorsNumber: number }});
    }

    onPressSaveButton = () => {
        const { vehicle } = this.state;

        let hasInvalidFields = false;
        let invalidFieldsString = "";

        console.log(this.state.vehicle.model)
        if (this.state.vehicle.model.id === 0 ||  this.state.vehicle.model.id === undefined) {
            invalidFieldsString += "\nSelecione um modelo";
            hasInvalidFields = true;
        }

        if (this.state.vehicle.year === undefined || this.state.vehicle.year < 1900 || this.state.vehicle.year > 2100) {
            invalidFieldsString += "\nColoque um ano maior que 1900 e menor que 2100";
            hasInvalidFields = true;
        }

        this.setState(
            prevState => ({
                vehicle: {
                    ...prevState.vehicle,
                    images: [...prevState.vehicle.images.filter(it => !it.isLast)]
                }
            })
        )

        if (hasInvalidFields) {
            Alert.alert("Ops, corrija alguns campos para continuar", invalidFieldsString);
        } else {
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

    }

    redirectToVehicleList = () => {
        this.props.navigation.navigate('VehiclesUser');
    }

    onPressBackButton = () => {
        this.redirectToVehicleList();
    }

    handleDeleteImage = (index: number) => {
        var array = [...this.state.vehicle.images];
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({vehicle: { ...this.state.vehicle,  images: array }});
        }
    }

    openDeleteImageDialog = (index: number) => {
        Alert.alert("Deletar imagem", "Deseja realmente deletar essa imagem?",
                    [
                        {
                            text: 'Deletar',
                            onPress: () => this.handleDeleteImage(index),
                        },
                        {
                            text: 'Voltar',
                            onPress: () => {},
                        }
                    ]
                    )
    }

    openImagePicker = () => {
        let isImagesLengthValid = true;
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.6,
            maxFiles: 10,
            mediaType: 'photo',
            includeBase64: true
        })
        .then(response => {
            if (this.state.vehicle.images.filter(it => !it.isLast).length + response.length <= 5) {
                response.map(image => {
                        this.setState(prevState => ({
                            vehicle: {
                                ...this.state.vehicle,
                                images: [...this.state.vehicle.images.filter(it => !it.isLast), {
                                    file: image.data,
                                    fileContentType: 'image/jpeg',
                                    fileName: image.filename || "image",
                                    isLast: false
                                }]
                            }
                        }));
                    
                });
            } else {
                isImagesLengthValid = false;
            }
        }).then(() => {
            if (this.state.vehicle.images.filter(it => !it.isLast).length < 5) {
                this.setState(
                    prevState => ({
                        vehicle: {
                            ...this.state.vehicle,
                            images: [...prevState.vehicle.images.filter(it => !it.isLast), {
                                file: "",
                                fileContentType: 'image/jpeg',
                                fileName: "",
                                isLast: true
                            }]
                        }
                    }
                ));
            }

            if (!isImagesLengthValid) {
                Alert.alert("Ops", "só é possível escolher até no máximo 5 imagens, por favor selecione as mais que considera mais importante");
            }
        });
        
    }

    renderEmptyImageComponent() {
        return (
            <TouchableOpacity style={{width: Dimensions.get('window').width}} onPress={this.openImagePicker}>
                <View style={styles.imagePickerContainer}>
                    <Image source={images.cameraIcon} style={styles.imageIcon} />
                    <Text>Incluir foto</Text>
                    <Text>{this.state.vehicle.images.filter(it => !it.isLast).length < 0 ? 0 : this.state.vehicle.images.filter(it => !it.isLast).length} de 5 selecionadas</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderImageComponent(image: VehicleImage, index: number) {
        if (image.isLast) {
            return this.renderEmptyImageComponent();
        }
        else {
            return (
                <TouchableOpacity style={{width: Dimensions.get('window').width - 100}} onLongPress={() => this.openDeleteImageDialog(index)}>
                    <View style={styles.imagePickerContainer}>
                        <Image source={{uri: "data:image/jpeg;base64," + image.file, scale: 1}} style={styles.imageCar} />
                    </View>
                </TouchableOpacity>
            )
        }
    }

    onChangeSelectedBrand(item: any) {
        this.setState({selectedBrand: item},() => {
            this.getAllModels()
        })   
    }

    onChangeSelectedModel(item: any, index: number) {
        console.log(index);
        this.setState({selectedModel: item}, () => {
            console.log("Modelo INDICE: " + this.state.selectedModel)
            let selectedModelObj = this.state.optionModels[index];
            console.log(selectedModelObj)
            if (selectedModelObj) {
                this.setState({ vehicle: {...this.state.vehicle, model: {...selectedModelObj, brand :{}}, }})
            }
        }); 
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
                        renderItem={({item, index}) => this.renderImageComponent(item, index)} 
                        ListEmptyComponent={this.renderEmptyImageComponent()}
                        data={this.state.vehicle.images}
                        keyExtractor={(item, index) => index.toString()}
                        maxToRenderPerBatch={10}
                    />
                </View>
                <View style={{backgroundColor: colors.white, padding: 20}}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Marca</Text>
                        <View style={styles.picker}>
                            <Picker prompt='Marca' 
                                    selectedValue={this.state.selectedBrand}
                                    onValueChange={item => this.onChangeSelectedBrand(item)}
                                >
                                {
                                    
                                this.state.optionsBrand.map((item: any) => {
                                    return (<Picker.Item label={item.name} value={item.id} key={item.id}/>) 
                                })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Modelo</Text>
                            <View style={styles.picker}>
                                <Picker prompt='Modelo'
                                    selectedValue={this.state.selectedModel}
                                    onValueChange={(item, index) => this.onChangeSelectedModel(item, index)}
                                    >
                                    {
                                    this.state.optionModels.map((item: any) => {
                                        return (<Picker.Item label={item.name} value={item.id} key={item.id}/>) 
                                        }) 
                                    }
                                </Picker>
                            </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Combustível'
                            placeholder='Ex. Gasolina'
                            inputWidth={170}
                            onChange={this.onChangeFuelType.bind(this)}
                            value={this.state.vehicle.fuelType}
                        />
                        <InputContainer
                            title='Câmbio'
                            placeholder='Ex. Automático'
                            inputWidth={170}
                            onChange={this.onChangeTransmissionType.bind(this)}
                            value={this.state.vehicle.transmissionType}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Quilometragem'
                            placeholder='Ex. 54578'
                            inputWidth={170}
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
                            inputWidth={170}
                            onChange={this.onChangeCategory.bind(this)}
                            value={this.state.vehicle.category}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Detalhes'
                            placeholder='Ex. Lataria impecável, motor revisado e rodas novas'
                            inputWidth={Dimensions.get('window').width - 50}
                            numberOfLines={5}
                            multiline={true}
                            onChange={this.onChangeDetails.bind(this)}
                            value={this.state.vehicle.details}
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
        borderWidth: 1, 
        borderRadius: 10,
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
    },
    picker: {
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: 'black', 
        overflow: 'hidden',
        marginTop: 10,
    },
});

export {VehicleRegisterPage, InputContainer}