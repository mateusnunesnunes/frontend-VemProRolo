import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ParamList } from "../../controller/routes";
import { StyleSheet,Text, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api } from "../../controller";
import CurrencyInput from 'react-native-currency-input';

interface Props {
    navigation: StackNavigationProp<ParamList, 'FilterScreenAnnouncement'>,
    route: RouteProp<ParamList, 'FilterScreenAnnouncement'>
}

interface State {
    optionsBrand: any;
    optionModels: any;
    selectedBrand: any;
    selectedModel: any;
    selectedDoors: any;
    searchText: any;
    selectedMinPrice: number | null;
    selectedMaxPrice: number | null;
    selectedMaxKm: any;
    selectedMinKm: any;
}

export default class FilterScreenAnnouncement extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            optionModels: [],
            optionsBrand: [],
            selectedBrand: 0,
            selectedModel: 0,
            selectedDoors: 0,
            searchText: '',
            selectedMinPrice: 0.00,
            selectedMaxPrice: 0,
            selectedMaxKm: 0,
            selectedMinKm: 0
        }
    }
    onChangeMinPrice= (num: number) => {
        this.setState({selectedMinPrice:num});
    }

    onChangeMaxPrice= (num: number) => {
        this.setState({selectedMaxPrice:num});
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
                
                this.setState({optionModels : response.data}, () => {
                    this.state.optionModels.unshift({"id": 0, "name": "Todas"})
                    this.setState({selectedModel:0});
                })
            })
            .catch(error => console.log("Algo deu errado", "Erro Interno"));
        }      
    }

    onChangeSelectedBrand(item: any) {
        this.setState({selectedBrand: item},() => {
            this.getAllModels()
        })   
    }
    
    componentDidMount() {
        this.getBrands()
        this.getAllModels()
    }

    filterDoneButton() {
        this.props.route.params.onGoBack(
            this.state.selectedBrand,
            this.state.selectedModel,
            this.state.selectedDoors,
            this.state.searchText,
            this.state.selectedMinPrice,
            this.state.selectedMaxPrice,
            this.state.selectedMaxKm,
            this.state.selectedMinKm
            );
        this.props.navigation.goBack();
    }

    render() {
        return(
        <View style={styles.container}>
            <Text style={styles.header}>Pesquisar </Text>
            <TextInput
                style={styles.inputSearch}
                keyboardType="default"
                placeholder="Busca"
                onChangeText={item => this.setState({searchText: item})}
            />
            <Text style={styles.header}>Marca</Text>
            <View style={styles.picker}>
                <Picker prompt='Marca' 
                    selectedValue={this.state.selectedBrand}
                    onValueChange={item => this.onChangeSelectedBrand(item)}
                    
                >
                {
                    this.state.optionsBrand != undefined ?
                    this.state.optionsBrand.map((item: any) => {
                    return (<Picker.Item label={item.name} value={item.id} key={item.id}/>) 
                    })
                    : console.log("nada")
                }
                </Picker>
            </View>
            <Text style={styles.header}>Modelo</Text>
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
            
            <Text style={styles.header}>Preço (R$)</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    {/* <TextInput
                    style={styles.input}
                    placeholder="Valor Mínimo"
                    keyboardType="numeric"
                    onChangeText={item => this.setState({selectedMinPrice: item})}
                    /> */}
                    <View style={styles.inputContainer}>
                        <CurrencyInput 
                            style={styles.inputCurrency} 
                            value={this.state.selectedMinPrice}
                            prefix="R$"
                            delimiter="."
                            separator=","
                            precision={2}
                            placeholder="Valor Mínimo"
                            onChangeValue={this.onChangeMinPrice.bind(this)}
                        />
                    </View>

                </View>
                <View style={styles.column}>
                    {/* <TextInput
                    style={styles.input}
                    placeholder="Valor Máximo"
                    keyboardType="numeric"
                    onChangeText={item => this.setState({selectedMaxPrice: item})}
                    /> */}
                    <View style={styles.inputContainer}>
                        <CurrencyInput    
                            style={styles.inputCurrency} 
                            value={this.state.selectedMaxPrice}
                            prefix="R$"
                            delimiter="."
                            separator=","
                            precision={2}
                            placeholder="Valor Maxímo"
                            onChangeValue={this.onChangeMaxPrice.bind(this)}
                        />
                    </View>
                </View>
            </View>
            <Text style={styles.header}>Km</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput
                    style={styles.input}
                    placeholder="Km mínimo"
                    keyboardType="numeric"
                    onChangeText={item => this.setState({selectedMinKm: item})}
                    />
                </View>
                <View style={styles.column}>
                    <TextInput
                    style={styles.input}
                    placeholder="Km Máximo"
                    keyboardType="numeric"
                    onChangeText={item => this.setState({selectedMaxKm: item})}
                    />
                </View>
            </View>
            <Text style={styles.header}>Qtd Portas</Text>
            <View style={styles.picker}>
                <Picker
                selectedValue={this.state.selectedDoors}
                onValueChange={item => this.setState({selectedDoors: item})}>
                    <Picker.Item label="Qualquer" value="0" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="4" value="4" />

                </Picker>
            </View>
            <TouchableOpacity onPress={this.filterDoneButton.bind(this)}>
                <View style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>
                        FILTRAR
                    </Text>
                </View>
            </TouchableOpacity>
            
        </View>);
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignContent: 'center',
       backgroundColor: '#F2F2F2'
   },
   header: {
        color:'#999999',
        marginVertical:10,
        marginLeft: 20,
        fontSize: 15
   },
   picker: {
        borderWidth: 1, 
        borderColor: '#D4D4D4', 
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    input: {
        backgroundColor: 'white',
        width: 200,
        borderColor: '#D4D4D4',
        borderWidth: 1
    },
    inputCurrency: {
        backgroundColor: 'white',
        width: 200,
        borderColor: '#D4D4D4',
        borderWidth: 1,
        padding: 10
    },
    inputSearch: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#D4D4D4',
        borderWidth: 1,
        padding: 10
    },
    row: {
        flexDirection: 'row',
        
    },
    column: {
        flexDirection: 'column'
    },
    doneButton: {
        width: '100%',
        backgroundColor: 'black',
        height:50,
        marginTop: 85,
        justifyContent:'center',
        alignContent: 'center'
    },
    doneButtonText: {
        color:'white',
        fontSize: 20,
        marginLeft: 150
    },
    inputContainer: {
        margin: 0
    },
});
