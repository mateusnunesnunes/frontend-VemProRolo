import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking, Modal, Pressable } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import IconDescription from './IconDescription';
import ReportModal from "./ReportModal";
import { colors } from "../../view/styles/Colors";
import { InputContainer } from "../../view/screens/VehicleRegisterPage";

interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleSaleDatails'>,
    route: RouteProp<ParamList, 'VehicleSaleDatails'>
}

interface State {
    item: any,
    reportModalVisible: boolean,
    reportVehicleText: string
}

const fullWidth = Dimensions.get('window').width;



export default class VehicleSaleDatails extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            item: this.props.route.params.item,
            reportModalVisible: true,
            reportVehicleText: ""
        }
        
      }

   setReportModalVisible = () => {
       this.setState({reportModalVisible: !this.state.reportModalVisible}, () => console.log(this.state.reportModalVisible));
   }

    onChangeDetails = (text: string) => {
        this.setState({reportVehicleText: text});
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
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Denunciar veículo</Text>
                            <View style={{flexDirection: 'row'}}>
                                <InputContainer
                                    title=''
                                    placeholder='Quero denunciar esse veículo porque...'
                                    inputWidth={Dimensions.get('window').width - 100}
                                    numberOfLines={5}
                                    multiline={true}
                                    onChange={this.onChangeDetails.bind(this)}
                                    value={this.state.reportVehicleText}
                                    style={styles.reportInput}
                                />
                            </View>
                            <View style={styles.modalButtonsContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonReport]}
                                    onPress={() => this.setReportModalVisible()}
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
                </Modal>
            </View>
                <ScrollView>
                    <View style={styles.containerFlatlist}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.item.images}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => ( 
                                <Image source={{uri : 'data:image/png;base64, ' + item.file}} style={styles.imageStyle} />
                            )}
                        />
                    </View>
                    <View style={styles.containerContent}>
                            <Text style={styles.title}>
                                {this.state.item.model.brand.name} {this.state.item.model.name}
                            </Text>
                            <Text style={styles.price}>
                                R$ {this.state.item.price}
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
        marginTop: -10
    },

    reportInput: {
        borderColor: colors.black,
        borderStyle: 'solid', 
        borderWidth: 2, 
        borderRadius: 10,
        fontSize: 16,
        padding: 5
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
        padding: 15,
        elevation: 2,
        width: 110
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
});