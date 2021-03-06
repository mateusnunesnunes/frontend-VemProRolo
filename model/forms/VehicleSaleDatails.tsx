import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking, Modal, Pressable, Alert } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import IconDescription from './IconDescription';
import ReportModal from "./ReportModal";
import { colors } from "../../view/styles/Colors";
import { InputContainer } from "../../view/screens/VehicleRegisterPage";
import { api } from "../../controller";
import {formatCurrency} from '../../utils/currencyUtils';
import images from "../../view/themes/Images";
interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleSaleDatails'>,
    route: RouteProp<ParamList, 'VehicleSaleDatails'>
}

interface State {
    item: any,
    reportModalVisible: boolean,
    reportVehicleText: string,
    reported: boolean
}

const fullWidth = Dimensions.get('window').width;



export default class VehicleSaleDatails extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            item: this.props.route.params.item,
            reportModalVisible: false,
            reportVehicleText: "",
            reported: false
        }
        
      }

   setReportModalVisible = () => {
       this.setState({reportModalVisible: !this.state.reportModalVisible}, () => {
           if (!this.state.reportModalVisible) {
               this.setState({reportVehicleText: "", reported: false});
           }
       });
   }

   whatsAppRedirect() {
        let s = " "
        let urlApi = `https://api.whatsapp.com/send?text=Olá,${this.state.item.user.name}&phone=${this.state.item.user.phone}`
        let urlApp = `whatsapp://send?phone=${this.state.item.user.phone}&text=Olá`
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

   componentDidMount() {
       console.log(this.state.item.user.phone)
   }
    onChangeDetails = (text: string) => {
        this.setState({reportVehicleText: text});
    }

    sendReport = () => {
        api.post('/reports', {description: this.state.reportVehicleText, vehicle: {id: this.state.item.id}})
        .then(() => this.setState({reported: true}))
        .catch(error => Alert.alert("Algo deu errado", error));
    }

    render() {
         return(
         <View style={styles.container}>
            <View style={styles.centeredView}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.reportModalVisible}
                onRequestClose={() => {}}>
                    {this.state.reported 
                    ?
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Denunciar anúncio</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.detailsName}>Anúncio denunciado com sucesso!</Text>
                            </View>
                            <View style={styles.modalButtonsContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonReport]}
                                    onPress={() => this.setReportModalVisible()}
                                >
                                    <Text style={styles.textStyle}>Fechar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Denunciar anúncio</Text>
                            <View style={{flexDirection: 'row'}}>
                                <InputContainer
                                    title=''
                                    placeholder='Porque deseja denunciar esse anúncio?'
                                    inputWidth={Dimensions.get('window').width - 100}
                                    numberOfLines={5}
                                    multiline={true}
                                    onChange={this.onChangeDetails.bind(this)}
                                    value={this.state.reportVehicleText}
                                />
                            </View>
                            <View style={styles.modalButtonsContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonReport]}
                                    onPress={() => this.sendReport()}
                                >
                                    <Text style={styles.textStyle}>Denunciar</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={() => this.setReportModalVisible()}
                                >
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    }
                    </Modal>
                </View>
                <ScrollView>
                    <View style={styles.containerFlatlist}>
                        {this.state.item?.images[0]?.file == undefined ? (
                            <Image source={images.carSilhouet} style={styles.imageStyle} resizeMode="cover" />
                        ) : (
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={this.state.item.images}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => ( 
                                    <Image source={{uri : 'data:image/png;base64, ' + item.file}} style={styles.imageStyle} />
                                )}
                            />
                        )}
                    </View>
                    <View style={styles.containerContent}>
                            <Text style={styles.title}>
                                {this.state.item.model.brand.name} {this.state.item.model.name}
                            </Text>
                            <Text style={styles.price}>
                                R$ {formatCurrency(this.state.item.price)}
                            </Text>
                            <Text style={styles.date}>
                                Publicado em {((this.state.item.createdDate.split('T')[0]).split('-')[2])}/{(this.state.item.createdDate.split('T')[0]).split('-')[1]}
                            </Text>
                            <View style={styles.separator}></View>
                            <Text style={styles.header}>
                                Descrição
                            </Text>
                            <Text style={styles.detailsName}>
                            {(this.state.item.model.brand.name).toUpperCase()} {(this.state.item.model.name).toUpperCase()} 
                            </Text>
                            <Text>
                            {this.state.item.details}
                            </Text>
                            <View style={styles.separator}></View>
                            <Text style={styles.header}>
                                Características
                            </Text>
                            <Text style={styles.detailsName}>
                            {(this.state.item.model.brand.name).toUpperCase()} {(this.state.item.model.name).toUpperCase()} {(this.state.item.color).toUpperCase()} 
                            </Text>
                            <View style={styles.viewRow}>
                                <View style={styles.viewColumn}>
                                    <IconDescription title={"Ano"} value={this.state.item.year} icon={require("./../../view/assets/calendarIcon.png")}></IconDescription>
                                    <IconDescription title={"Km"} value={this.state.item.kilometers} icon={require("./../../view/assets/speedIcon.png")}></IconDescription>
                                    <IconDescription title={"Câmbio"} value={this.state.item.transmissionType} icon={require("./../../view/assets/engineIcon.png")}></IconDescription>
                                </View>
                                <View style={styles.viewColumn}>
                                    <IconDescription title={"Combustível"} value={this.state.item.fuelType} icon={require("./../../view/assets/fuelIcon.png")}></IconDescription>
                                    <IconDescription title={"Categoria"} value={this.state.item.category} icon={require("./../../view/assets/categoryIcon.png")}></IconDescription>
                                    <IconDescription title={"Portas"} value={this.state.item.doorsNumber} icon={require("./../../view/assets/doorIcon.png")}></IconDescription>
                                </View>
                            </View>
                            <View style={styles.separator}></View>
                            <TouchableOpacity onPress={() => this.whatsAppRedirect()}>
                                <Text style={styles.header}>
                                    Contato
                                </Text>
                                <View style={styles.viewRow}>
                                    <Image style={styles.logoWhats} source={require("../../view/assets/logoWhats.png")} />
                                    <Text>{ this.state.item.user.phone}</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <View style={styles.separator}></View>
                            <View style={styles.reportContainer}>
                                <Text style={styles.reportName}>
                                    Irregularidades no anúncio?
                                </Text>
                                <TouchableOpacity onPress={() => this.setReportModalVisible()}>
                                    <Text style={styles.reportText}>Denunciar</Text>
                                </TouchableOpacity>
                                
                            </View>
                            
                    </View>

                </ScrollView>
         </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center"
    },
    imageStyle: {
        width:350,
        height: 250,
        margin: 10,

    },
    containerFlatlist: {
        backgroundColor: '#e5e5e5',
        height: 280,
        width: '100%'
    },
    containerContent: {
        flex:1,
        alignItems: 'flex-start',
        margin: 10,
    },
    
    title: {
        fontSize:20,
        marginTop: 10,
    },
    price: {
        fontSize: 30,
        fontWeight: '100',
        marginTop:0,
        
    },
    date: {
        color: "#8D8D8D",
        marginTop: 15,
    },
    separator: {
        width: '100%',
        backgroundColor: '#8D8D8D',
        height: 1,
        marginVertical: 25
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    detailsName: {
        marginVertical: 10
    },
    viewRow: {
        flexDirection: "row",
        marginVertical: 15
    },
    viewColumn: {
        flexDirection: "column"
    },
    reportName: {
        marginVertical: 10,
        fontSize: 18
    },
    reportText: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.red
    },
    reportContainer: {
        width: fullWidth,
        alignContent: "center",
        alignItems: "center",
        marginTop: -10,
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100
      },
      buttonReport: {
        backgroundColor: colors.lightBlue,
      },
      buttonCancel: {
        backgroundColor: colors.red,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
      },
      modalTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 19
      },
      modalButtonsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: Dimensions.get('window').width - 100,
        marginTop: 15
    },
    logoWhats: {
        height: 25,
        width: 25
    }
});