import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Image, KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { ScrollView, Switch, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import { Dimensions, FlatList } from "react-native";
import images from "../themes/Images";
import { InputForm } from "../../model/forms/InputForm";
import ImagePicker from "react-native-image-crop-picker";
import { api } from "../../controller";
import {Picker} from '@react-native-community/picker';
import CurrencyInput from 'react-native-currency-input';
import { Vehicle } from "../../model/Vehicle";
import { VehicleImage } from "../../model/VehicleImage";

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
    selectedDoorsNumber: any;
    isFirstTimeModel: boolean;
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
    style?: object;
}

const InputContainer = (props: InputContainerProps): JSX.Element => {

    const { placeholder, title, inputWidth, numberOfLines, multiline, keyboardType, onChange, value, style } = props;
    
    return (
        
        <View style={styles.inputContainer}>
            <Text style={styles.title}>{title}</Text>
            <InputForm 
                placeholder={placeholder}
                style={style ? style : {...styles.input, width: inputWidth}} 
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
                images: [],
                price: 0.00,
                isToLike: false,
                isForSale: false
            },
            vehicleToUpdate: this.props.route.params.vehicleToUpdate,
            optionsBrand: [],
            modelsEnabled: false,
            optionModels: [],
            selectedModel: 0,
            selectedBrand: 0,
            selectedDoorsNumber: 0,
            isFirstTimeModel: true
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
                        this.setState({selectedBrand:0}, () => this.getAllModels());
                    } else {
                        let index = this.state.optionsBrand
                                .map((it: any) => it.id)
                                .indexOf(this.state.vehicleToUpdate?.model.brand.id);
                        this.setState({selectedBrand: index}, () => this.firstPopulateSavedModel());
                    }
                    
                    
                })
                
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
    }

    firstPopulateSavedModel = () => {
        this.setState({optionModels: []}, () => {
            api.get('/models/allModelsByBrand/'+this.state.selectedBrand)
            .then(response => {
                this.setState({optionModels : response.data}, () => {
                    this.state.optionModels.unshift({"id": 0, "name": "Selecione um modelo..."});
                    let index = this.state.optionModels
                                .map((it: any) => it.id)
                                .indexOf(this.state.vehicleToUpdate?.model.id);
                        this.setState({selectedModel: this.state.vehicleToUpdate?.model.id});
                })
            })
            .catch(error => console.log("Algo deu errado", "Erro Interno"));
        });
        
    }

    getAllModels = () => {
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
            console.log(this.state.vehicleToUpdate.doorsNumber);
            this.setState(
                {
                    vehicle: {
                        ...this.state.vehicleToUpdate,
                        images: [...this.state.vehicleToUpdate.images.filter(it => !it.isLast)]
                    },
                    selectedDoorsNumber: this.state.vehicleToUpdate.doorsNumber
                }, () => {
                    if (this.state.vehicle.images.length < 5) {
                        console.log("qw"+this.state.selectedDoorsNumber);
                        this.setState({vehicle: {...this.state.vehicle, 
                            images: 
                            [...this.state.vehicle.images.filter(it => !it.isLast), 
                                {
                                    file: "",
                                    fileContentType: 'image/jpeg',
                                    fileName: "",
                                    isLast: true
                                }]}})
                    }
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

    onChangePrice = (num: number) => {
        this.setState({vehicle: { ...this.state.vehicle, price: num }});
    }

    onChangeDetails = (text: string) => {
        this.setState({vehicle: { ...this.state.vehicle, details: text }});
    }

    onPressSaveButton = () => {
        const { vehicle } = this.state;

        let hasInvalidFields = false;
        let invalidFieldsString = "";

        if (this.state.vehicle.model.id === 0 ||  this.state.vehicle.model.id === undefined) {
            invalidFieldsString += "\nSelecione um modelo";
            hasInvalidFields = true;
        }

        if (this.state.vehicle.year === undefined || this.state.vehicle.year < 1900 || this.state.vehicle.year > 2100) {
            invalidFieldsString += "\nColoque um ano maior que 1900 e menor que 2100";
            hasInvalidFields = true;
        }

        if (this.state.vehicle.doorsNumber === 0 || this.state.vehicle.doorsNumber === undefined) {
            invalidFieldsString += "\nSelecione o n??mero de portas do seu ve??culo";
            hasInvalidFields = true;
        }

        let images = this.state.vehicle.images.filter(it => !it.isLast);

        this.setState(
            prevState => ({
                vehicle: {
                    ...prevState.vehicle,
                    images: images
                }
            })
        )

        if (hasInvalidFields) {
            Alert.alert("Oops... corrija os campos abaixo para continuar", invalidFieldsString);
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
        let isLast = false;
        if (array.length == 5 && !array.some(it => it.isLast)) {
            isLast = true;
        }
        if (index !== -1) {
            array.splice(index, 1);
            if (isLast) {
                array.push({
                    file: "",
                    fileContentType: 'image/jpeg',
                    fileName: "",
                    isLast: true
                });
            }
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
            compressImageQuality: 0.09,
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
                Alert.alert("Ops", "s?? ?? poss??vel escolher at?? no m??ximo 5 imagens, por favor selecione as mais que considera mais importante");
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

    onChangeSelectedModel(item: any) {
        this.setState({selectedModel: item }, () => {
            this.setState({ vehicle: {...this.state.vehicle, model: {id: item, brand :{}}, }})
        }); 
    }

    onChangeDoorsNumber(item: any) {
        console.log("cheguei aqui depois")
        this.setState({selectedDoorsNumber: item }, () => {
            this.setState({ vehicle: {...this.state.vehicle, doorsNumber: item }})
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
                                    onValueChange={(item) => this.onChangeSelectedModel(item)}
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
                            inputWidth={70}
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
                        <View style={{...styles.inputContainer, width: 135}}>
                        <Text style={styles.title}>Portas</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.selectedDoorsNumber}
                                onValueChange={(item) => this.onChangeDoorsNumber(item)}
                                >
                                <Picker.Item label="Selecione" value={0} />
                                <Picker.Item label="2" value={2} />
                                <Picker.Item label="4" value={4} />

                            </Picker>
                        </View>
                    </View>
                        
                        
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Combust??vel'
                            placeholder='Ex. Gasolina'
                            inputWidth={170}
                            onChange={this.onChangeFuelType.bind(this)}
                            value={this.state.vehicle.fuelType}
                        />
                        <InputContainer
                            title='C??mbio'
                            placeholder='Ex. Autom??tico'
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
                        <View style={{...styles.inputContainer, width: 170, justifyContent: 'space-around'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <Text style={styles.title}>Anunciar venda</Text>
                                <Switch 
                                    trackColor={{ false: "#bababa", true: "#bd59cf" }}
                                    thumbColor={this.state.vehicle.isForSale ? "#9000a8" : "#949494"}
                                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} 
                                    value={this.state.vehicle.isForSale}
                                    onValueChange={() => this.setState({vehicle: {...this.state.vehicle, isForSale: !this.state.vehicle.isForSale}})}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.title}>Fazer rolo</Text>
                                <Switch 
                                    trackColor={{ false: "#bababa", true: "#bd59cf" }}
                                    thumbColor={this.state.vehicle.isToLike ? "#9000a8" : "#949494"}
                                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} 
                                    value={this.state.vehicle.isToLike}
                                    onValueChange={() => this.setState({vehicle: {...this.state.vehicle, isToLike: !this.state.vehicle.isToLike}})}
                                />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={this.state.vehicle.isForSale ? {...styles.title, width: 170, color: 'black'} : {...styles.title, width: 170, color: 'gray'}}>Pre??o</Text>
                            <CurrencyInput 
                                style={{...styles.input, width: 170}} 
                                value={this.state.vehicle.price}
                                onChangeValue={this.onChangePrice.bind(this)}
                                prefix="R$"
                                delimiter="."
                                separator=","
                                precision={2}
                                editable={this.state.vehicle.isForSale}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <InputContainer
                            title='Detalhes'
                            placeholder='Ex. Lataria impec??vel, motor revisado e rodas novas'
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