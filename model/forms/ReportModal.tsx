import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {Text, View, Dimensions, Linking, Modal } from "react-native";
import { ParamList } from "../../controller/routes";
import { StyleSheet,TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Vehicle } from "../../view/screens/VehicleRegisterPage";

interface Props {
    vehicle: Vehicle,
    visible: boolean
}

interface State {
    vehicle: Vehicle,
    visible: boolean
}

const fullWidth = Dimensions.get('window').width;

export default class ReportModal extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            vehicle: this.props.vehicle,
            visible: this.props.visible
        }
        
      }

    componentDidMount() {
        console.log("Cheguei")
    }

    hideModal = () => {
        this.setState({visible: false});
    }
    
    render() {
         return(
            <View style={styles.centeredView}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.visible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, styles.buttonClose]}
                    onPress={() => this.hideModal()}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                </Modal>
          </View>

            );
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
