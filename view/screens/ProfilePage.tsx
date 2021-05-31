import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ParamList } from "../../controller/routes";
import { colors } from "../styles/Colors";
import images from "../themes/Images";

interface Props {
    navigation: StackNavigationProp<ParamList, 'ProfilePage'>,
    route: RouteProp<ParamList, 'ProfilePage'>
}

interface State {
}

export default class ProfilePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
        }
      }
    render() {
        return(
            <View style={{flex: 1, backgroundColor: colors.white}}>
                <View style={{backgroundColor: colors.darkBlue, flex: 1}}>
                   
                </View>
                <View style={styles.profileContainer}>
                    <View style={styles.userDataContainer}>
                        <View style={styles.alignItensContainer}>
                            <TouchableOpacity style={styles.userProfileFoto}>
                                <Image source={images.addPhotoIcon} />
                            </TouchableOpacity>
                            <View style={{width: 220, justifyContent: 'center'}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Gabriel Fortunato</Text>
                                <Text>gfjgabriel@gmail.com</Text>
                            </View>
                        </View>                 
                    </View>
                    <View style={styles.divisor} />
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItemContainer}>
                            <View style={styles.menuItemDetail} />
                            <Image source={images.myInfoIcon} style={styles.icon} />
                            <Text style={styles.menuItemText}>Minha conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItemContainer}>
                            <View style={styles.menuItemDetail} />
                            <Image source={images.carIcon} style={styles.icon} />
                            <Text style={styles.menuItemText}>Meus veículos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.veryLightGrey,
        flex: 3,
        alignItems: 'center'
    },
    userDataContainer: {
        height: 120,
        alignItems: 'center',
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
        width: '80%',
        backgroundColor: colors.darkGrey
    },
    menuItemContainer:{
        height: 40,
        width: 350,
        backgroundColor: colors.white,
        borderRadius: 30,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'center'
        ,alignItems: 'center'
    },
    menuItemDetail: {
        width: 20, 
        height: '100%', 
        backgroundColor: colors.darkGrey,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    icon: {
        height: 30,
        marginLeft: 10,
        tintColor: colors.darkGrey
    },
    menuItemText: {
        marginLeft: 10,
        fontSize: 20,
        color: colors.darkGrey,
        fontWeight: 'bold'
    }
});