import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ParamList } from "../../controller/routes";
import { api } from "../../controller";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Alert
  } from 'react-native';

import CardItem from '../../model/forms/CardItem';

interface Props {
    navigation: StackNavigationProp<ParamList, 'MatchScreen'>,
    route: RouteProp<ParamList, 'MatchScreen'>
}

interface State {
    matches: any,
    user: User | undefined
}

export interface User {
    
    id?: number;

    name: string;
    
    email: string;
    
    phone: string;
}



export default class MatchScreen extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            matches: [],
            user: undefined
        }
    }

    getMatches = () =>{
        api.get('/matches')
            .then(response => {
                this.setState({ matches: response.data })
            })
        .catch(error => console.log("Algo deu errado", "Erro Interno"));
    }

    returnFunction = () => {
        this.getMatches()
    }

    openDetailMatch(item: any) {
        this.props.navigation.navigate('MatchModal',{item: item, onGoBack: this.returnFunction});
    }

    fetchUser = () => {
        api.get('/users/current')
        .then(response => {
            this.setState({user: response.data as User})
        })
        .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
    }

    handleLikeImage = (item: any) => {
        let image;
        if (item.secondLike?.user?.id == this.state.user?.id) {
            image = item.secondLike?.vehicle?.images[0]?.file;
        } else {
            image = item.firstLike?.vehicle?.images[0]?.file;
        }
        return image != undefined ? {uri : 'data:image/png;base64, ' + image} : images.carSilhouet
    }

    componentDidMount() {
        this.fetchUser();
        this.getMatches()
    }
    render() {
        return(
            <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.bg}
            >
            <View style={styles.containerMatches}>
                <ScrollView>
                <View style={styles.top}>
                    <Text style={styles.title}>Aqui est??o seus Matches!</Text>
                </View>

                <FlatList
                    numColumns={1}
                    data={this.state.matches}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.openDetailMatch(item)}>
                        <CardItem
                        date={item.createdDate}
                        image={this.handleLikeImage(item)}
                        name={item.firstLike.user.name}
                        description={item.secondLike.vehicle.details}
                        />
                    </TouchableOpacity>
                    )}
                />
                </ScrollView>
            </View>
            </ImageBackground>
        );
    }

}
import { StyleSheet, Dimensions } from "react-native";
import UserAccountPage from "./UserAccountPage";
import images from "../themes/Images";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: "cover",
        width: DIMENSION_WIDTH,
        height: DIMENSION_HEIGHT
    },
    containerMatches: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10
    },
    top: {
        paddingTop: 20,
        marginHorizontal: 10,
        marginVertical:10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: { 
        fontSize: 22, 
        color: "#555", 
        textAlign: 'center' ,
        fontWeight: 'bold'
    },
    icon: {
        fontFamily: "tinderclone",
        fontSize: 20,
        color: "#363636",
        paddingRight: 10
    }




});