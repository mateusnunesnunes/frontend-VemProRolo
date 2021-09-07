import { Image, StyleSheet, Text, View } from "react-native";
import { ParamListBase, RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from 'react';
import { ParamList } from "../controller/routes";
import { colors } from "../view/styles/Colors";
import images from "../view/themes/Images";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    navigation: StackNavigationProp<ParamListBase>,
}

export default class Header extends React.Component<Props> {
    
    constructor(props: Props) {
        super(props);
        this.state = {}
    }
    
    redirectToChatPage(this: any) {
        this.props.navigation.navigate("MatchScreen")
    }

    render() {
        return(
            <View style={{
                height: 50,
                backgroundColor: colors.white,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style={{ fontSize:24, padding: 10, fontWeight: '600' }}>VemProRolo</Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.redirectToChatPage()}
                    style={{padding: 10}}
                >
                    <View>
                        <Image
                            source={images.chatIcon} 
                            resizeMode='contain' 
                            style={{
                            ...styles.imageIcon,
                            tintColor: colors.darkGrey
                    }}/>
                    </View>
                </TouchableOpacity>
            </View>);
    }

}

const styles = StyleSheet.create({
    imageIcon: {
      width: 30,
      height: 30
    }
});
