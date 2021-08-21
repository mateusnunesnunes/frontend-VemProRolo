import React from 'react';
import { Text, View,TextInput, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, Alert, Dimensions  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import styles from '../styles/views/LikeList';
import { StackNavigationProp } from '@react-navigation/stack';
import Card from '../../model/forms/Card';
import  data from './data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { api } from "../../controller";

export const emptyListCard = () => {
  return (
    <View style={{
      height: Dimensions.get('window').height - 200,
      width: Dimensions.get('window').width,
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{fontSize: 20, fontWeight: "300"}}>Não foram encontrados outros veículos</Text>
    </View>
  );
}

export const loading = () => {
  return (
    <View style={{
      height: Dimensions.get('window').height - 200,
      width: Dimensions.get('window').width,
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{fontSize: 20, fontWeight: "300"}}>Carregando...</Text>
    </View>
  );
}

export default class LikeList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        currentIndex: 0,
        currentId: 0,
        vehicleList: [],
        noVehiclesFound: false
    }
  }

  pressElement(item,index){
  }

  sendLikeRequest(likeType) {
    if (this.state.vehicleList.length == 0) {
      return;
    }
    console.log("Current index on sendLikeRequest: ", this.state.currentIndex)
    let id = this.state.vehicleList[this.state.currentIndex].id;
    console.log("Current Vehicle id on sendLikeRequest: ", id)
    let like = {
      type: likeType,
      vehicle: {
        id: id
      }
    }
    api.post('/likes', like)
      .then(response => {
        if (response.data.matched === true) {
          Alert.alert(
            "Match", 
            "O dono do veículo que você gostou também gostou de um veículo seu!",
            [
              {
                text: "Continuar vendo veículos",
                onPress: () => this.scrollToItem(),
                style: "cancel"
              },
              { text: "Ver match", onPress: () => {this.scrollToItem()}
              }
            ]);
        } else {
            this.scrollToItem();
        }
      })
      .catch(error => Alert.alert("Algo deu errado no LIKE ", "Erro Interno: " + error));

  }

  removeVehicle(index) {
    var array = [...this.state.vehicleList]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({vehicleList: array}, console.log("Current length: " + this.state.vehicleList.length), () => {return});
  }

  likeEvent(){
    this.sendLikeRequest("INTERESTED");
  }

  dislikeEvent(){
    this.sendLikeRequest("NOT_INTERESTED");
  }

  scrollToItem = () => {
    let len = this.state.vehicleList.length;
    let curIndex = this.state.currentIndex;
    this.removeVehicle(curIndex);
    if(this.state.currentIndex + 1 < len) {
      //this.flatListRef.scrollToIndex({animated: true, index: "" + (this.state.currentIndex + 1)});
    } else {
      this.setState({ vehicleList: [] });
      this.setState({noVehiclesFound: true});
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
  }

  componentDidMount() {
    this.fetchVehicles();
    this.props.navigation.addListener('focus', () => {
      this.fetchVehicles();
    });
  }

  fetchVehicles = () =>{
    api.get('/vehicles/to-like')
        .then(response => {
          if (response.data.length === 0) {
            this.setState({noVehiclesFound: true});
          } else {
            this.setState({noVehiclesFound: false});
          }
          this.setState({vehicleList: response.data});
        })
    .catch(error => console.log("Algo deu errado", "Erro Interno"));
  }

  render() {
    return (
        <SafeAreaView>
         <View style={styles.container}>
          <FlatList
              initialScrollIndex={0}
              ref={(ref) => { this.flatListRef = ref; }}
              data={this.state.vehicleList}
              onViewableItemsChanged={this.onViewableItemsChanged}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ListEmptyComponent={this.state.noVehiclesFound ? emptyListCard : loading}
              renderItem={({item,index}) => (
                <TouchableWithoutFeedback onPress={() => this.pressElement(item,index)}>
                  <View style={{
                    height:800,
                    width:'100%',
                    flex:1
                  }}>
                    <Card
                      item={item}
                    >
                    </Card>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
         </View>
         <View style={styles.containerButton}>
            <TouchableOpacity style={styles.likeButton} onPress={this.likeEvent.bind(this)}>
                <Image style={styles.imageLike} source={require('./../../view/assets/likeIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton} onPress={this.dislikeEvent.bind(this)}>
                <Image style={styles.imageDislike} source={require('./../../view/assets/deslikeIcon.png')}/>
            </TouchableOpacity>
         </View>
        </SafeAreaView>
    );
  }
}

