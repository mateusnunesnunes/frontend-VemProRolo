import React from 'react';
import { Text, View,TextInput, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, Alert  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import styles from '../styles/views/LikeList';
import { StackNavigationProp } from '@react-navigation/stack';
import Card from '../../model/forms/Card';
import  data from './data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { api } from "../../controller";


export default class LikeList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        currentIndex: 0,
        currentId: 0,
        vehicleList: []
    }
  }

  pressElement(item,index){
  }

  sendLikeRequest(likeType) {
    let id = this.state.vehicleList[this.state.currentIndex].id;
    let like = {
      type: likeType,
      vehicle: {
        id: id
      }
    }
    api.post('/likes', like)
      .then(response => {
          console.log(response);
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
      .catch(error => Alert.alert("Algo deu errado", "Erro Interno"));
  }

  likeEvent(){
    this.sendLikeRequest("INTERESTED");
  }

  dislikeEvent(){
    this.sendLikeRequest("NOT_INTERESTED");
  }

  scrollToItem = () => {
    let len = this.state.vehicleList.length
    let curIndex = this.state.currentIndex 
    if(curIndex != len - 1){
      this.setState({ currentIndex : this.state.currentIndex + 1});
      this.flatListRef.scrollToIndex({animated: true, index: "" + (this.state.currentIndex + 1)});
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    //console.log("Visible items are", viewableItems);
    //console.log("Changed in this iteration", changed);
    //console.log("O Anterior foi: " + this.state.vehicleList[this.state.currentIndex].id);
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
            this.setState({vehicleList: response.data})
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
              onViewableItemsChanged={this.onViewableItemsChanged }
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
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

