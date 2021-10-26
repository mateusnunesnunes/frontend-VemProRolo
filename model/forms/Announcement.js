import { TextInput, StyleSheet, View, ImagePropTypes, KeyboardTypeOptions, Text, Image } from 'react-native';
import React from 'react';
import {formatCurrency} from '../../utils/currencyUtils'

const Announcement = ({
    image,
    title,
    price,
    details
}) => {
    
    return (
        <View style={styles.container}>
            
            <Image style={styles.productImage} source={{uri: "data:image/jpeg;base64," + image}}></Image>

            <View style={styles.containerContent}>
                <Text style={styles.title}>{title}</Text> 
                <Text style={styles.price}>R$ {formatCurrency(price)}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' 
                style={styles.details}>{details}</Text>
            </View>

            
        
        </View>
    );
  };



const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
    },
    containerContent: { 
    backgroundColor: "white",
    flex: 1
    },
    container: {
        backgroundColor: "#ffffff",
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
        borderRadius:15

    },
    productImage: {
        width: 140,
        height: 120,
        resizeMode: "stretch",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    description: {
        padding: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: "#5C5C5C",
        marginLeft: 10,
    },
    price: {
        fontSize: 20,
        color: "#5C5C5C",
        fontWeight: "bold",
        marginLeft: 10,
    },
    details: {
        fontSize: 15,
        color: "#A9A9A9",
        marginTop: 10,
        marginLeft: 10,
        padding: 5
    },

});
export default Announcement;