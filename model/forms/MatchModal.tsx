import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity,Alert } from "react-native";
import { Image } from "react-native";
import { api } from "../../controller";
import images from "../../view/themes/Images";

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

    deleteMatch = (id:number) =>{
        console.log("Delete")
        api.delete('/matches/' + id)
        .then(() => {
            this.props.route.params.onGoBack();
            this.props.navigation.goBack();
        })
        .catch(error => Alert.alert(error));
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
                                    <Image source={this.state.item.firstLike.vehicle?.images[0]?.file != undefined ? {uri : 'data:image/png;base64, ' + this.state.item.firstLike.vehicle?.images[0]?.file} : images.carSilhouet} style={styles.imageStyle} />
                                </View>
                                <View style={styles.column}></View>
                            </View>
                            <View style={styles.row}></View>
                            <View style={styles.row}></View>
                            <View style={styles.row}>
                                <View style={styles.column}></View>
                                <View style={styles.column}>
                                    <Image source={this.state.item.secondLike.vehicle?.images[0]?.file != undefined ? {uri : 'data:image/png;base64, ' + this.state.item.secondLike.vehicle?.images[0]?.file} : images.carSilhouet} style={styles.imageStyle} />        
                                </View>
                            </View>
                        </View>
                        <View  style={styles.description}>
                            <Text style={styles.descriptionText}>É um Match!</Text>
                            <Text style={styles.descriptionUsersText}>Você e {this.state.item.firstLike.user.name} gostaram dos carros um do outro</Text>
                            <TouchableOpacity style={styles.messageButton}>
                                <Text style={styles.messageButtonText} onPress={() => this.whatsAppRedirect()}>Enviar uma mensagem</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={styles.messageButtonText} onPress={() => this.deleteMatch(this.state.item.match_id)}>Deletar match</Text>
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
        height: '80%',
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
    },
    row:{
        flexDirection: 'row',
        height: '17%',
        width: '90%',
    },
    column:{
        flexDirection: 'column',
        width: '28%',
        margin: 20
    },
    imageStyle: {
      width: 170 ,
      height: 120,
      margin: 10,
      borderWidth: 4,
      resizeMode: 'stretch',
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
        marginTop: 100,
        flex: 0.3,
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText: { 
        paddingBottom: 10, 
        color: '#4A4A4A',
        fontSize: 22,
        fontWeight: 'bold'
    },
    descriptionUsersText: {
        width: '80%',
        color: '#4A4A4A',
        fontSize: 16,
        textAlign: 'center'
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
        marginTop: 30
    },
    deleteButton:{
        padding: 10,
        marginTop: 20,
        backgroundColor: '#B02019',
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
