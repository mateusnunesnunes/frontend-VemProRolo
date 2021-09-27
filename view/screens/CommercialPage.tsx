import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {FlatList, Image, Modal, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { ParamList } from "../../controller/routes";
import Announcement from "../../model/forms/Announcement"
import { api } from "../../controller";

interface Props {
    navigation: StackNavigationProp<ParamList, 'CommercialPage'>,
    route: RouteProp<ParamList, 'CommercialPage'>
}

interface State {
    vehicleList: any,
    noVehiclesFound:boolean
}

export default class CommercialPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            vehicleList:[],
            noVehiclesFound: false,
        }
        this.getVehiclesForSale.bind(this)
    }



    componentDidMount() {
        this.getVehiclesForSale('')
    }

    openDetailVehicle(item: any) {
        this.props.navigation.navigate('VehicleSaleDatails',{item: item});
    }

    filterOpen() {
        this.props.navigation.navigate('FilterScreenAnnouncement',{onGoBack: this.returnFunction});
    }

    returnFunction = (
        brandId: any, 
        modelId: any, 
        doors: any, 
        searchText:any, 
        minPrice: any, 
        maxPrice: any, 
        maxKm:any ,
        minKm: any,) => {

        let filterStr = ''
        let brandStr = ''
        let modelStr = ''
        let searchStr = ''
        let minPriceStr = ''
        let maxPriceStr = ''
        let maxKmStr = ''
        let minKmStr = '&minKilometers='+minKm.toString()
        let doorsStr = "&doorsNumber="+doors.toString()
        if (brandId != 0) {
            brandStr = "&brandId="+brandId.toString()
        }
        if (modelId != 0) {
            modelStr = "&modelId="+modelId.toString()
        }
        if (searchText != '') {
            searchStr = "&search="+searchText
        }
        if (minPrice != 0) {
            minPriceStr = "&minPrice="+minPrice
        }
        if (maxPrice != 0) {
            maxPriceStr = "&maxPrice="+maxPrice
        }
        if (maxKm != 0) {
            maxKmStr = "&maxKilometers="+maxKm
        }
        filterStr = brandStr + modelStr + searchStr + minPriceStr + maxPriceStr + maxKmStr + minKmStr + doorsStr 
        
        this.getVehiclesForSale(filterStr.toString())
    }

    getVehiclesForSale= (str: any) => {
        api.get('/vehicles/for-sale?'+str)
            .then(response => {
                this.setState({ vehicleList: response.data })
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
    }

    render() {
        return(
            <View style={{ flex: 1,alignItems: 'center',justifyContent: 'center',}}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text
                            style={{
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 20,
                                fontSize: 20,
                                fontWeight: "bold",
                                marginTop: 10,
                                marginHorizontal: 30
                            }}
                            >
                            Anúncios
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <TouchableOpacity onPress={() => this.filterOpen()}>
                            <Image style={styles.imageFilter} source={require("../assets/filterIcon.png")}></Image>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                
                
                <View style={styles.flatListContainer}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.vehicleList}
                    keyExtractor={item => item.id}
                    
                    renderItem={({ item }) => ( 
                        <TouchableOpacity onPress={() => this.openDetailVehicle(item)}>
                            <Announcement 
                                image={item.images[0].file}
                                title={item.model.name}
                                price={item.price}
                                details={item.details}
                            ></Announcement>
                        </TouchableOpacity>
                    )}
                    />
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageIcon: {
      width: 30,
      height: 30
    },
    flatListContainer: {
       width: '92%',
       height: '92%'
    },
    imageFilter: {
        height: 50,
        width: 50
    },
    row: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    column: {
        flexDirection: "column",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
      },
      container: {
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      },
    
});