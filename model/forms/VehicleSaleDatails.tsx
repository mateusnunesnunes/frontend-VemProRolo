import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import IconDescription from './IconDescription';

interface Props {
    navigation: StackNavigationProp<ParamList, 'VehicleSaleDatails'>,
    route: RouteProp<ParamList, 'VehicleSaleDatails'>
}

interface State {

    item: any,
}

const fullWidth = Dimensions.get('window').width;



export default class VehicleSaleDatails extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            item: this.props.route.params.item
        }
        
      }

   
    

    render() {
         return(
         <View style={styles.container}>
                
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

});