import React from "react";
import { Alert, Image, StyleSheet, Text, View, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { api, removeApiToken } from "../../controller";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import {CardMyVehicle} from "./../../model/forms/CardMyVehicle";

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

    redirectToRegisterPage = () => {
        this.props.navigation.navigate('VehicleRegisterPage');
    }
    fetchVehicles = () => {
        api.get('/vehicles/current-user')
        .then(response => {
            this.setState({vehicleList: response.data})
            console.log(response.data)
        })
        .catch(error => Alert.alert(error));
    }
    render() {
        return(
            <SafeAreaView >
                <FlatList
                initialScrollIndex={0}
                data={this.state.vehicleList}
                renderItem={({item,index}) => (
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={styles.viewRow}>
                                <View style={styles.viewColumn}>
                                    <Image source={require('./../../model/imgs/palioTest.jpeg')} style={styles.imageCar} />
                                </View>
                                <View style={styles.viewColumn}>
                                    <Text  style={styles.name}>{item.model}</Text>
                                    <Text  style={styles.description}>{item.brand}</Text>
                                    <Text  style={styles.year} >{item.year}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                /> 
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.redirectToRegisterPage}>
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
        marginLeft:20
    }

});