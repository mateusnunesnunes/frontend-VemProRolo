import React from "react";
import { Alert, Image, StyleSheet, Text, View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { api, removeApiToken } from "../../controller";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import images from "../themes/Images";
import {CardMyVehicle} from "./../../model/forms/CardMyVehicle";
import subscriptionApi from "../../controller/subscriptionApi";

export default class VehiclesUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            vehicleList: []
        }
      }
    
    componentDidMount() {
        this.fetchVehicles();
        
        this.props.navigation.addListener('focus', () => {
            this.fetchVehicles();
        });
    }

    handleUserSubscription = () => {
        return subscriptionApi.getCurrentUserSubscription().then(response => {
            if (response.data && response.data.active) {
                this.redirectToRegisterPage();
            } else {
                if (this.state.vehicleList.length < 1) {
                    this.redirectToRegisterPage();
                } else {
                    Alert.alert(
                        "Número máximo de veículos", 
                        "Assine nosso plano Premium para cadastrar quantos veículos quiser e muito mais!",
                        [
                            { 
                                text: "Ver planos", onPress: () => {
                                    this.redirectToSubscriptionsPage()
                                }
                            },
                            {
                              text: "Cancelar",
                              style: "cancel"
                            },
                        ]);
                }
            }
        });
    }

    redirectToRegisterPage = () => {
        this.props.navigation.navigate('VehicleRegisterPage', {vehicleToUpdate: undefined} );
    }

    redirectToSubscriptionsPage = () => {
        this.props.navigation.navigate('SignaturesScreen');
    }

    fetchVehicles = () => {
        api.get('/vehicles/current-user')
        .then(response => {
            this.setState({vehicleList: response.data})
        })
        .catch(error => Alert.alert(error));
    }

    handleEditCarPress = (item) => {
        this.props.navigation.navigate("VehicleRegisterPage", { vehicleToUpdate: item } );
    }

    deleteVehicle = (item) => {
        api.delete('/vehicles/' + item.id)
        .then(() => {
            this.fetchVehicles();
        })
        .catch(error => Alert.alert(error));
    }

    render() {
        return(
            <SafeAreaView >
                <View style={styles.containerContent}>
                    <FlatList
                    initialScrollIndex={0}
                    data={this.state.vehicleList}
                    renderItem={({item,index}) => (
                        
                        <TouchableWithoutFeedback
                        style={styles.container}
                        onPress={() => this.handleEditCarPress(item)}
                        
                        >
                            <View style={styles.card}>
                                <View style={styles.viewRow}>
                                    <View style={{...styles.viewColumn, flex: 2}}>
                                    { item.images?.find(it => it != undefined)?.file == null ? (
                                        <Image source={images.carSilhouet} style={styles.imageCar} />
                                        
                                    ) : (
                                        <Image source={{uri: "data:image/jpeg;base64," + item.images[0].file}} style={styles.imageCar} />
                                    )}
                                        
                                    </View>
                                    <View style={{...styles.viewColumn, alignItems:'flex-start', flex:2}}>
                                        <Text  style={styles.name}>{item.model?.name}</Text>
                                        <Text  style={styles.description}>{item.brand?.name}</Text>
                                        <Text  style={styles.year} >{item.year}</Text>
                                    </View>
                                    <View style={{...styles.viewColumn, justifyContent: 'center', alignItems: 'flex-end', flex: 3}}>
                                        <TouchableOpacity onPress={() => this.deleteVehicle(item)}>
                                            <Image source={require('../assets/closeIconCar.png')} style={{height: 30, width: 30}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    /> 
                </View>
                
                
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => this.handleUserSubscription()}>
                        <Image source={require('./../../view/assets/addCardIcon.png')}/>                  
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        
    },
    containerButton: {
        backgroundColor:'transparent',
        marginTop:2,
        marginHorizontal:20,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
      },
    containerContent:{
        height: '85%'
    },
    card:{
        padding:10,
        width:'90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        backgroundColor:colors.white,
        elevation: 6,
        borderRadius:10,
        margin:10
    },
        imageCar:{
        height:80,
        width:80
    },
    name:{
        fontSize:20,
        fontWeight:'bold',
        color: colors.grey,
    },
    description:{
        fontSize:15,
        color: colors.grey,
    },
    year:{  
        fontSize:15,
        color: colors.grey,  
    },
    viewRow: {
        flexDirection: "row"
    },
    viewColumn: {
        flexDirection: "column",
        marginLeft:10,
    }

});