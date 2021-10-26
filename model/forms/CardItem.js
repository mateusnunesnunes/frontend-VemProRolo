import React from 'react';

import { Text, View, Image, Dimensions, TouchableOpacity ,StyleSheet } from 'react-native';
import Icon from './Icon';

const CardItem = ({
  name,
  image,
  description,
  date
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 5,
      width: 100 ,
      height: 120,
      resizeMode: 'contain'
    }
  ];

  const nameStyle = [
    {
	    marginTop: 16,
		marginHorizontal:7,
		color: '#4A4A4A',
		fontSize: 17,
		fontWeight: 'bold',
		
    }
  ];
  const descriptionStyle = [
    {
	  color: '#4A4A4A',
      fontSize: 16,
	  margin:5,

    }
	
  ];
  const dateSrc = (((date.split("T"))[0]).split("-"))
  const datePos = dateSrc[2] +"/"+ dateSrc[1] +"/"+ dateSrc[0]

  return (
    <View style={styles.containerCardItem}>
      <View style={styles.row}>
		<View style={styles.viewImage}>
			<Image source={{uri : 'data:image/png;base64, ' + image}} style={imageStyle} />
		</View>
		<View style={styles.viewTexts}>
			<Text style={nameStyle}>Match com {name}</Text>
			<Text style={descriptionStyle}>{description}</Text>
			<Text style={styles.date}>{datePos}</Text>
		</View>
      </View>
    </View>
  );
};

const WHITE = "#FFFFFF";
const DARK_GRAY = "#363636";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";
const ICON_FONT = "tinderclone";
const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
	date: {
		color: '#999999',
		marginHorizontal:7,
	},
	viewImage:{
		width: '30%',
		height: '90%',
		alignItems: 'center'
	},
	viewTexts: {
		width: '70%',
		height: '90%',
	},
  	containerCardItem: {
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		alignItems: "center",
        shadowColor: "#0000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
	},
  row:{
    flexDirection: 'row',
  },
});
export default CardItem;
