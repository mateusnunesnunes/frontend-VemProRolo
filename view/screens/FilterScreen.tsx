import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { PickerIOS, Text, View, } from "react-native";
import { ParamList } from "../../controller/routes";
import {Picker} from '@react-native-community/picker';
import { StyleSheet,TouchableOpacity } from "react-native";
import { api } from "../../controller";
import { Value } from "react-native-reanimated";
import { useState } from "react";
import { ItemValue } from "@react-native-community/picker/typings/Picker";

interface Props {
    navigation: StackNavigationProp<ParamList, 'FilterScreen'>,
    route: RouteProp<ParamList, 'FilterScreen'>
}

interface State {
    optionsBrand: any;
    selectedBrand: any;
    modelsEnabled: boolean;
    optionModels: any;
    selectedModel: any;
}



export default class FilterScreen extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            optionsBrand: [],
            selectedBrand: 0,
            selectedModel: 0,
            modelsEnabled: false,
            optionModels: [],
        }
        
      }

    getBrands = () =>{
        api.get('/brands/allBrands')
            .then(response => {
                this.setState({ optionsBrand: response.data }, () => {
                    this.state.optionsBrand.unshift({"id": 0, "name": "Todas"})
                    this.setState({selectedBrand:0});
                })
                
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
    }

    getAllModels = () =>{
        if(this.state.selectedBrand == 0) {
            api.get('/models/allModels')
            .then(response => {
                this.setState({optionModels : response.data}, () => {
                    this.state.optionModels.unshift({"id": 0, "name": "Todas"})
                    this.setState({selectedModel:0});
                })
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
        }
        else{
            this.setState({optionModels: []})
            api.get('/models/allModelsByBrand/'+this.state.selectedBrand)
            .then(response => {
                this.setState({optionModels : response.data})
            })
            .catch(error => console.log("Algo deu errado", "Erro Interno"));
        }
        
    }

    componentDidMount() {
        this.getBrands()
        this.getAllModels()
    }

    filterDoneButton() {
        console.log("--------")
        console.log("selectedBrand "+this.state.selectedBrand ?? "nada")
        console.log("selectedModel "+this.state.selectedModel ?? "nada")
        this.props.route.params.onGoBack(this.state.selectedBrand,this.state.selectedModel);
        this.props.navigation.goBack();
    }


    onChangeSelectedBrand(item: any) {
        this.setState({selectedBrand: item},() => {
            this.getAllModels()
        })   
    }

    render() {
        

        return(
            <View style={styles.container}>
                <View style={styles.containerViewPicker}>
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
                    <Text style={styles.title}>Modelo</Text>
                    <View style={styles.picker}>
                        <Picker prompt='Modelo'
                        selectedValue={this.state.selectedModel}
                        onValueChange={item => this.setState({selectedModel:item})}
                        >
                        {
                           this.state.optionModels.map((item: any) => {
                               return (<Picker.Item label={item.name} value={item.id} key={item.id}/>) 
                            }) 
                        }
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={this.filterDoneButton.bind(this)} style={styles.doneButton}>
                        <Text style={styles.buttonText}>Aplicar Filtros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DFE0E6',
        width: '100%',
        height: '100%',
    },
    containerViewPicker: {
        borderRadius: 10, 
        borderWidth: 2, 
        borderColor: 'black', 
        backgroundColor: 'white',
        marginTop:'30%',
        margin: 30,
        height: '65%',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 20
    },
    picker: {
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: 'black', 
        overflow: 'hidden',
        margin: 20,
    },
    doneButton: {
        width:'55%',
        backgroundColor: 'black',
        paddingVertical:5,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        shadowColor: 'rgba(0.5, 0.5, 0.5, 0.5)',
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 1 ,
        shadowOffset : { width: 2, height: 2},
        margin:40,
        marginLeft: 75,
    },
    buttonText: {
        color: 'white',
        fontSize: 15
    }
});
