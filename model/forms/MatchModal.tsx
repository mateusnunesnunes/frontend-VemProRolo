import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";

interface Props {
    navigation: StackNavigationProp<ParamList, 'MatchModal'>,
    route: RouteProp<ParamList, 'MatchModal'>
}

interface State {

    item: any,
}

const fullWidth = Dimensions.get('window').width;



export default class MatchModal extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            item: this.props.route.params.item
        }
        
      }

    componentDidMount() {
        //this.whatsAppRedirect(this.state.item)
    }

    whatsAppRedirect() {
        let s = " "
        let urlApi = `https://api.whatsapp.com/send?text=Olá,${this.state.item.secondLike.user.name}&phone=${this.state.item.secondLike.user.phone}`
        let urlApp = `whatsapp://send?phone=${this.state.item.secondLike.user.phone}&text=Olá`
        console.log(urlApi)
        console.log(urlApp)
        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
            if (supported) {
                return Linking.openURL(urlApi);
            } else {
                return Linking.openURL(urlApi);
            }
        })
    }
    

    render() {
         return(
                <View style={styles.container}>
                    <View style={styles.card_template}>
                        <View style={styles.containerMatch}>
                            <View style={styles.row}>
                                <View style={styles.column}>
                                <Image source={{uri : 'data:image/png;base64, ' + this.state.item.firstLike.vehicle.images[0].file}} style={styles.imageStyle} />
                                </View>
                                <View style={styles.column}></View>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.column}></View>
                                <View style={styles.column}>
                                    <Image source={{uri : 'data:image/png;base64, ' + this.state.item.secondLike.vehicle.images[0].file}} style={styles.imageStyle} />        
                                </View>
                            </View>
                        </View>
                        <View  style={styles.description}>
                            <Text style={styles.descriptionText}>É um Match!</Text>
                            <TouchableOpacity style={styles.messageButton}>
                                <Text style={styles.messageButtonText} onPress={() => this.whatsAppRedirect()}>Enviar uma mensagem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFE0E6',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card_template:{
        width: '90%',
        height: '75%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    containerMatch: {
        flex: 0.5,
        alignContent:'center',
    },
    row:{
        flexDirection: 'row',
        height: '15%',
        width: '90%',
        
    },
    column:{
        flexDirection: 'column',
        width: '40%',
        margin: 20

    },
    imageStyle: {
      borderRadius: 8,
      width: (fullWidth / 2.5) - 20 ,
      height: 200,
      margin: 10,
      resizeMode: 'contain',
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    description: {
        flex: 0.3,
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText: { 
        paddingBottom: 10, 
        fontSize: 22, 
        color: "#363636" 
    },
    messageButton: {

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
    
    },
    messageButtonText: {
        color: 'white',
        fontSize: 15
    }
});
function alert(arg0: string) {
    throw new Error("Function not implemented.");
}
