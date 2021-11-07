import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {signaturesData} from "../assets/signaturesData"
import { api } from "../../controller";
import subscriptionApi from "../../controller/subscriptionApi";
import { Alert } from "react-native";

interface Props {
    navigation: StackNavigationProp<ParamList, 'SignaturesScreen'>,
    route: RouteProp<ParamList, 'SignaturesScreen'>
}

interface State {
    selectedPlan: any
    selectedPlancolor: any
    planID: any
}

const fullWidth = Dimensions.get('window').width;



export default class SignaturesScreen extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            selectedPlan: '',
            selectedPlancolor: '#333333',
            planID: 0,
        }
        
      }

    componentDidMount() {
        console.log(signaturesData)
        this.handleUserSubscription()
    }

    handleUserSubscription = () => {
        return subscriptionApi.getCurrentUserSubscription().then(response => {
            if (response.data && response.data.active) {
                this.setState({planID: 1})
                this.setState({selectedPlan: this.toCamelCase(response.data.plan?.planType)})
                this.setState({selectedPlancolor:"#763885"})
            } else {
                this.setState({planID: 0})
                this.setState({selectedPlan: 'Padrão'})
                this.setState({selectedPlancolor:"#64A374"})
            }
        })
    }

    toCamelCase(str: any) {
        return "" + str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
    }
    
    alertModal = (id: number) => {
        let plan = ''
        let action = ''

        if (id === this.state.planID) return;

        if (id == 0) {
            plan = 'Padrão'
            action = 'cancelar seu'
        }
        else{
            plan = 'Premium'
            action = 'assinar esse'
        }
        Alert.alert(
            "Você está escolhendo o plano "+plan, 
            "Tem certeza que deseja " + action + " plano?",
            [
                { 
                    text: "Confirmar", onPress: () => {
                        this.selectPlan(id)
                    }
                },
                {
                  text: "Cancelar",
                  style: "cancel"
                },
            ]);
    }

    selectPlan = (id: number) => {
        
        return subscriptionApi.getCurrentUserSubscription().then(response => {
            if (response.data && response.data.active) {
                this.setState({planID: response.data.id})
            }
            let plan = ''

            if (id == 0) {
                plan = 'Padrão'
                this.setState({selectedPlancolor:"#64A374"})
                this.setState({selectedPlan:plan})

                api.delete('/subscriptions/' + this.state.planID)
                .then(() => {
                    this.setState({planID: 0})
                    console.log("subscriptionDeleted")
                })
                .catch(error => console.log(error));
            }
                
            if (id == 1) {
                plan = 'Premium'
                this.setState({selectedPlancolor:"#763885"})
                this.setState({selectedPlan:plan})

                api.post("/subscriptions", {
                    "plan":{
                        "id":1
                    }
                }).then(response => {
                    this.setState({planID: 1})
                    console.log(response)
                })
            }
        })
        
        
    }

    render() {
        const  color = {
            backgroundColor: this.state.selectedPlancolor
        }
        const combineStyles = StyleSheet.flatten([styles.currentPlan, color]);    

         return(
             <ScrollView>
                 <View style={styles.container}>
                     <Text style={styles.header}>Tenha acesso à{"\n"}todos os recursos do{"\n"}VemProRolo!
                     </Text>
                        <View style={styles.containerFlatlist}>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={signaturesData}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => ( 
                                        <View style={styles.card}>
                                            <View style={styles.freeSign}>
                                                <Text style={styles.tag}>{(item.tagFree).toUpperCase()}</Text>
                                                <Text style={styles.description}>{item.descriptionFree}</Text>
                                            </View>
                                            <View style={styles.premiumSign}>
                                                <Text style={styles.tag}>{(item.tagPremium).toUpperCase()}</Text>
                                                <Text style={styles.description}>{item.descriptionPremium}</Text>
                                            </View>
                                        </View>
                                    )}
                                />
                        </View>
                        <View style={[styles.currentPlan, combineStyles]}>
                            <Text style={styles.currentPlanDetail}>Plano {this.state.selectedPlan}</Text>
                            <Text style={styles.currentTitle}>PLANO ATUAL</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.alertModal(0)}>
                            <View style={[styles.signature, styles.greenColor]}>
                                <Text style={styles.headerCard}>Plano Padrão</Text>
                                <Text style={styles.descriptionCard}>{'\u2B24'} Há um limite de carros que podem ser cadastrados.</Text>
                                <Text style={styles.descriptionCard}>{'\u2B24'} Há um limite de carros que você pode curtir </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.alertModal(1)}>
                            <View style={[styles.signature, styles.purpleColor]}>
                                <Text style={styles.headerCard}>Plano Premium</Text>
                                <Text style={styles.descriptionCard}>{'\u2B24'} Adicione quantos carros desejar!</Text>
                                <Text style={styles.descriptionCard}>{'\u2B24'} Curta quantos carros quiser!</Text>
                            </View>
                        </TouchableOpacity>
                        
                 </View>
                 
                 
             </ScrollView>
             
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center"
    },
    header:{
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 20
    },
    containerFlatlist: {
        height: 160,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',

        backgroundColor: "#D7D7D9",

    },
    card: {
        height:140,
        width: 250,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    freeSign: {
        height: '100%',
        width: '50%',
        backgroundColor: "#64A374",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    premiumSign: {
        height: '100%',
        width: '50%',
        backgroundColor: "#763885",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
        
    },
    tag: {

        color: 'white',
        marginVertical: 10
    },
    description: {
        alignItems: "center",
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 5
    },
    signature: {
        width: 340,
        height: 300,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        margin: 20,
        
    },
    headerCard: {
        fontWeight: "bold",
        fontSize: 30,
        color: 'white',
        marginBottom: 30
    },
    descriptionCard: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        margin: 10
    },
    greenColor: {
        backgroundColor: "#64A374"
    },
    orangeColor: {
        backgroundColor: "#D89C54"
    },
    lightBlueColor: {
        backgroundColor: "#627EAD"
    },
    blueColor: {
        backgroundColor: "#273668"
    },
    purpleColor: {
        backgroundColor: "#763885"
    },
    currentPlan: {
        height: 100,
        width: '85%',
        borderRadius: 10,
        flexDirection: 'row', 
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop:20

    },
    currentPlanDetail: {
        fontWeight: 'bold',
        color: 'white',
        alignItems: "center",
        fontSize: 18,
        marginHorizontal: 25
    },
    currentTitle: {
        color: 'white',
        alignItems: "center",
        justifyContent: 'center',
    }
});