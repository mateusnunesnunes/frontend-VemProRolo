import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api, removeApiToken } from "../../controller";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import images from "../themes/Images";

interface Props {
    navigation: StackNavigationProp<ParamList, 'ProfilePage'>,
    route: RouteProp<ParamList, 'ProfilePage'>,
    user: User
}

interface State {
    user: User;
}

export interface User {
    
    id?: number;

    name: string;
    
    email: string;
    
    phone: string;
}

export default class ProfilePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log("USER  ", this.props.user)
        this.state = {
            user: this.props.user
        }
      }

    componentDidMount() {
        this.fetchUser();
        this.props.navigation.addListener('focus', () => {
            this.fetchUser();
        });
      }

    fetchUser = () => {
        api.get('/users/current')
        .then(response => {
            this.setState({user: response.data as User})
        })
        .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
    }

    redirectToAccountPage = () => {
        this.props.navigation.navigate('UserAccountPage');
    }

    logout = () => {
        removeApiToken();
        this.props.navigation.navigate('Login');
    }

    signatureScreen = () => {
        this.props.navigation.navigate('SignaturesScreen');
    }

    redirectToVehiclesUser = () => {
        this.props.navigation.navigate('VehiclesUser');
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: colors.white}}>

                <View style={styles.divisor} />

                <View style={styles.userDataContainer}>

                    <View style={styles.menuItemContainer}>
                        <Image source={images.myInfoIcon} style={styles.mainIcon} />

                        <View style={{width: 230, justifyContent: 'center', marginLeft: 30}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.user?.name}</Text>
                            <Text>{this.state.user?.email}</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.profileContainer}>

                    <View style={styles.divisor} />

                    <View style={styles.menuContainer}>

                        <TouchableOpacity style={styles.menuItemContainer} onPress={this.redirectToAccountPage}>
                            <Image source={images.editIcon} style={styles.icon} />
                            <Text style={styles.menuItemText}>Minha conta</Text>
                            <View style={styles.arrowIconView}>
                                <Image source={images.arowRight} style={{...styles.icon, marginRight: 15}} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.redirectToVehiclesUser} style={styles.menuItemContainer}>
                            <Image source={images.carIcon} style={styles.icon} />
                            <Text style={styles.menuItemText}>Meus veículos</Text>
                            <View style={styles.arrowIconView}>
                                <Image source={images.arowRight} style={{...styles.icon, marginRight: 15}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItemContainer} onPress={this.signatureScreen}>
                            <Image source={images.premiumIcon} style={styles.icon} />
                            <Text style={styles.menuItemText}>Planos</Text>
                            <View style={styles.arrowIconView}>
                                <Image source={images.arowRight} style={{...styles.icon, marginRight: 15}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItemContainer} onPress={this.logout}>
                            <Image source={images.logoutIcon} style={styles.icon} />
                            <Text style={styles.menuItemText}>Sair</Text>
                            <View style={styles.arrowIconView}>
                                <Image source={images.arowRight} style={{...styles.icon, marginRight: 15}} />
                            </View>
                        </TouchableOpacity>

                        

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: colors.veryLightGrey,
        flex: 3,
        alignItems: 'center'
    },
    userDataContainer: {
        height: 70,
        justifyContent: 'center',
    },
    userProfileFoto: {
        backgroundColor: colors.white,
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignItensContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    divisor: {
        height: 1,
        marginBottom:5,
        width: '100%',
        backgroundColor: colors.darkGrey
    },
    menuItemContainer:{
        height: 60,
        width: 350,
        backgroundColor: colors.white,
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuContainer: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
        padding: 30
    },
    menuItemDetail: {
        width: 20, 
        height: '100%', 
        backgroundColor: colors.darkGrey,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    mainIcon: {
        height: 40,
        width: 40,
        marginLeft: 20,
        tintColor: colors.black
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 20,
        tintColor: colors.darkGrey,
        resizeMode: 'contain',
    },
    menuItemText: {
        marginLeft: 10,
        fontSize: 20,
        color: colors.darkGrey,
        fontWeight: 'bold'
    },
    arrowIconView: {
        flexDirection: "column", 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
        flex: 3
    },
    premiumicon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginLeft: 20,
        tintColor: colors.darkGrey
    },
    
});