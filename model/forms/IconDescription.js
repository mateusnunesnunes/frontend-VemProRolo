import * as React from 'react';
import { Image,Text, View, StyleSheet } from 'react-native';
import styles from '../../view/styles/views/IconDescription';



export default class IconDescription extends React.Component {
    constructor(props) {
        super(props);
      }
      
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.icon} source={this.props.icon} />
                <View style={styles.containerTexts}>
                    <Text style={styles.textTitle}>{this.props.title}</Text>
                    <Text style={styles.textValue}>{this.props.value}</Text> 
                </View>
            </View>
          );
    }
  
};


