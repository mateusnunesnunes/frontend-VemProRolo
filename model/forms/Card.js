import * as React from 'react';
import { Image,Text, View, StyleSheet } from 'react-native';
import styles from '../../view/styles/views/card';
import Faded from './Faded';
import IconDescription from './IconDescription';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View>
                        <Image
                        resizeMode="cover"
                        style={styles.logo}
                        
                        source={require('./../../model/imgs/palioTest.jpeg')}
                        ></Image>
                        <View style={{ flex: 1, position: 'absolute', bottom: 0, left: 0, right: 0 }}>  
                            <Faded color='#000000' direction="up" height={50}>
                                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white',fontSize:25,fontWeight:'bold'}}>{this.props.item.model}</Text>
                                </View>
                            </Faded>    
                        </View>
                    </View>
                    <View style={styles.containerDescription}>
        
                        <View style={styles.containerDescriptionTexts}>
                            <Text style={styles.descriptionTitle}>Descrição</Text>
                            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>{this.props.item.details}</Text>
                        </View>
        
                        <View style={styles.containerDetails}>
                            <Text style={styles.descriptionTitle}>Características</Text>
                            <View style={styles.containerDetailsIcons}>
                                <View style={styles.viewRow}>
                                    <View style={styles.viewColumn}>
                                        <IconDescription title={"Ano"} value={this.props.item.year} icon={require("./../../view/assets/calendarIcon.png")}></IconDescription>
                                        <IconDescription title={"Km"} value={this.props.item.kilometers} icon={require("./../../view/assets/speedIcon.png")}></IconDescription>
                                        <IconDescription title={"Câmbio"} value={this.props.item.transmissionType} icon={require("./../../view/assets/engineIcon.png")}></IconDescription>
                                    </View>
                                    <View style={styles.viewColumn}>
                                        <IconDescription title={"Combustível"} value={this.props.item.fuelType} icon={require("./../../view/assets/fuelIcon.png")}></IconDescription>
                                        <IconDescription title={"Categoria"} value={this.props.item.category} icon={require("./../../view/assets/categoryIcon.png")}></IconDescription>
                                        <IconDescription title={"Portas"} value={this.props.item.doorsNumber} icon={require("./../../view/assets/doorIcon.png")}></IconDescription>
                                    </View>
                                </View>
                            </View>
                            </View>
                    </View>
                </View>
            </View>
          );
    }
    
};


