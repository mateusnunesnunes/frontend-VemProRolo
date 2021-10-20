import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {signaturesData} from "../assets/signaturesData"
interface Props {
    navigation: StackNavigationProp<ParamList, 'SignaturesScreen'>,
    route: RouteProp<ParamList, 'SignaturesScreen'>
}

interface State {
    selectedPlan: any
}

const fullWidth = Dimensions.get('window').width;



export default class SignaturesScreen extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            selectedPlan: 'Padrão'
        }
        
      }

    componentDidMount() {
        console.log(signaturesData)
    }
    
    selectPlan = (id: number) => {
        let plan = ''
        if (id == 0) {
            plan = 'Padrão'
        }
        if (id == 1) {
            plan = 'Premium'
        }
        this.setState({selectedPlan:plan})
    }

    render() {
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
                        <View style={styles.currentPlan}>
                            <Text style={styles.currentPlanDetail}>Plano {this.state.selectedPlan}</Text>
                            <Text style={styles.currentTitle}>PLANO ATUAL</Text>
                        </View>
                        {/* <View style={[styles.signature, styles.greenColor]}>
                            <Text style={styles.headerCard}>What is Lorem Ipsum?</Text>
                            <Text style={styles.descriptionCard}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</Text>
                        </View>
                        <View style={[styles.signature, styles.orangeColor]}>
                            <Text style={styles.headerCard}>What is Lorem Ipsum?</Text>
                            <Text style={styles.descriptionCard}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</Text>
                        </View>
                        <View style={[styles.signature, styles.lightBlueColor]}>
                            <Text style={styles.headerCard}>What is Lorem Ipsum?s</Text>
                            <Text style={styles.descriptionCard}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</Text>
                        </View> */}
                        <TouchableOpacity onPress={() => this.selectPlan(0)}>
                            <View style={[styles.signature, styles.greenColor]}>
                                <Text style={styles.headerCard}>Plano Padrão</Text>
                                <Text style={styles.descriptionCard}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPlan(1)}>
                            <View style={[styles.signature, styles.purpleColor]}>
                                <Text style={styles.headerCard}>Plano Plus</Text>
                                <Text style={styles.descriptionCard}>Cadastro ilimitado de carros</Text>
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
        backgroundColor: "#333333",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    premiumSign: {
        height: '100%',
        width: '50%',
        backgroundColor: "#64A374",
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
        width: '85%',
        height: 450,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        margin: 20
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
        backgroundColor: "#333333",
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
        color: '#ACACAC',
        alignItems: "center",
        justifyContent: 'center',
    }
});