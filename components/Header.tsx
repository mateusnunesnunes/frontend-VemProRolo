import { Image, StyleSheet, Text, View } from "react-native";
import React from 'react';
import { colors } from "../view/styles/Colors";
import images from "../view/themes/Images";
import { TouchableOpacity } from "react-native-gesture-handler";

const Header = (): JSX.Element => {

    function redirectToChatPage() {

    }
    return (
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
                onPress={() => redirectToChatPage()}
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
        </View>
    );
}

export {Header};

const styles = StyleSheet.create({
    imageIcon: {
      width: 30,
      height: 30
    }
});