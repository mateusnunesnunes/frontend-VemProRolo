import React from 'react';
import { Text, View,TextInput, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, Alert, Dimensions, Modal, Pressable  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import styles from '../styles/views/LikeList';
import { StackNavigationProp } from '@react-navigation/stack';
import Card from '../../model/forms/Card';
import  data from './data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { api } from "../../controller";
import ReportModal from '../../model/forms/ReportModal';
import { InputContainer } from './VehicleRegisterPage';
import likeApi from '../../controller/LikeApi';

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
        brand: null,
        model: null,
        currentId: 0,
        vehicleList: [],
        noVehiclesFound: false,
        reportModalVisible: false,
        reportVehicleText: "",
        reported: false
    }
    this.returnFunction = this.returnFunction.bind(this);
  }

  filterCallback = (params) => {
      we.log("filterCallback")
  }

  pressElement(item,index){
  }

  setModalVisible = () => {
    this.setState({reportVehicleModalVisible: !this.state.reportVehicleModalVisible});
  }

  redirectToSubscriptionsPage = () => {
    this.props.navigation.navigate('SignaturesScreen');
  }

  sendLikeRequest(likeType) {
    if (this.state.vehicleList.length == 0) {
      return;
    }

    let id = this.state.vehicleList[this.state.currentIndex].id;
    let like = {
      type: likeType,
      vehicle: {
        id: id
      }
    }

    likeApi.createLike(like).then(response => {
      if(response.status === 403) {
        Alert.alert(
          "Número máximo de likes", 
          "Assine nosso plano Premium para poder dar quantos likes quiser e muito mais!",
          [
              { 
                  text: "Ver planos", onPress: () => {
                      this.redirectToSubscriptionsPage()
                  }
              },
              {
                text: "Cancelar",
                style: "cancel"
              },
          ]);
      } else if (response.data.matched === true) {
          Alert.alert(
            "Match",
            "O dono do veículo que você gostou também gostou de um veículo seu!",
            [
              {
                text: "Continuar vendo veículos",
                onPress: () => this.scrollToItem(),
                style: "cancel"
              },
              { text: "Ver match", onPress: () => {
                this.scrollToItem();
                this.redirectToMatchPage()
              }
              }
            ]);
        } else {
            this.scrollToItem();
        }
      })
      .catch(error => Alert.alert("Algo deu errado no LIKE ", "Erro Interno: " + error));

  }

  redirectToMatchPage() {
    this.props.navigation.navigate("MatchScreen")
}

  removeVehicle(index) {
    var array = [...this.state.vehicleList]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({vehicleList: array}, () => {return});
  }

  likeEvent(){
    this.sendLikeRequest("INTERESTED");
  }

  dislikeEvent(){
    this.sendLikeRequest("NOT_INTERESTED");
  }

  returnFunction(brandId,modelId) {
    this.setState({vehicleList: []});
    var brandStr = 'brandId='+brandId
    var modelStr = 'modelId='+modelId
    var separator = '&'
    if(brandId == 0 && modelId == 0) {
      this.fetchVehicles('')
    }
    else{
      if(brandId == 0){
        brandStr = ''
        separator = ''
      }
      if(modelId == 0){
        modelStr = ''
        separator = ''
      }
      console.log("end")
      console.log(brandStr+separator+modelStr)
      this.fetchVehicles(brandStr+separator+modelStr)
    }
  }

  fetchVehicles = (queryStr) =>{
    console.log("fetchVehicles")
    api.get('/vehicles/to-like?'+queryStr)
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

  filterEvent(){
    this.props.navigation.navigate('FilterScreen', {
      onGoBack: this.returnFunction,
    });
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
    console.log("componentDidMount")
    this.fetchVehicles('');
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
            <TouchableOpacity style={styles.filterButton} onPress={this.filterEvent.bind(this)}>
                <Image style={styles.imageFilter} source={require('./../../view/assets/filter.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton} onPress={this.likeEvent.bind(this)}>
                <Image style={styles.imageLike} source={require('./../../view/assets/likeIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton} onPress={this.dislikeEvent.bind(this)}>
                <Image style={styles.imageDislike} source={require('./../../view/assets/nextCarIcon.png')}/>
            </TouchableOpacity>
         </View>
        </SafeAreaView>
    );
  }
}

