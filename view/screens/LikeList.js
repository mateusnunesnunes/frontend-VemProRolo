import React from 'react';
import { Text, View,TextInput, KeyboardAvoidingView, TouchableOpacity, Image, FlatList  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import styles from '../styles/views/LikeList';
import { StackNavigationProp } from '@react-navigation/stack';
import Card from '../../model/forms/Card';
import  data from './data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native';
 

export default class LikeList extends React.Component{

  state = {
    index: 0,
  };
  pressElement(item,index){
      console.log(index); 
  }
  likeEvent(){
    console.log("like"); 
    this.scrollToItem();
  }

  scrollToItem = () => {
    if(this.state.index == 2){
      this.state.index = -1;
    }
    this.flatListRef.scrollToIndex({animated: true, index: "" + (this.state.index + 1)});
  }

  onViewableItemsChanged = ({changed }) => {
    this.state.index = changed[0].index;
    console.log("State = ", changed[0].index);
  }

  componentDidMount = async () => {
    //console.log(data.feed)
  }

  render() {
    return (
        <SafeAreaView>
         <View style={styles.container}>
          <FlatList
              initialScrollIndex={0}
              ref={(ref) => { this.flatListRef = ref; }}
              data={data.feed}
              onViewableItemsChanged={this.onViewableItemsChanged }
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
              scrollEnabled={true}
              renderItem={({item,index}) => (
                <TouchableWithoutFeedback onPress={() => this.pressElement(item,index)}>
                  <View style={{ 
                    height:950,
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
                <Image source={require('./../../view/assets/likeIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeButton} onPress={this.likeEvent.bind(this)}>
                <Image source={require('./../../view/assets/deslikeIcon.png')}/>
            </TouchableOpacity>
         </View>
        </SafeAreaView>
    );
  }
  }


  