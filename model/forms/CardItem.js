import React from 'react';

import { Text, View, Image, Dimensions, TouchableOpacity ,StyleSheet } from 'react-native';
import Icon from './Icon';

const CardItem = ({
  name,
  image,
  description
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth - 20 ,
      height: 200,
      margin: 20,
      resizeMode: 'contain'
    }
  ];

  const nameStyle = [
    {
      paddingTop: 15,
      paddingBottom: 10,
      color: '#363636',
      fontSize: 25,
      
    }
  ];
  const descriptionStyle = [
    {
      paddingTop: 15,
      paddingBottom: 10,
      color: '#363636',
      fontSize: 20,
      padding: 10,
    }
  ];

  return (
    <View style={styles.containerCardItem}>
      <View style={styles.row}>
        <Image source={{uri : 'data:image/png;base64, ' + image}} style={imageStyle} />
      </View>
      
      <Text style={nameStyle}>{name}</Text>
      <Text style={descriptionStyle}>{description}</Text>

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
  containerCardItem: {
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		alignItems: "center",
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: "#000000",
		shadowOffset: { height: 0, width: 0 }
	},
  row:{
    flexDirection: 'row',
  },
  matchesCardItem: {
		marginTop: -35,
		backgroundColor: "#7444C0",
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20
	},
  matchesTextCardItem: {
		fontFamily: "tinderclone",
		color: "#FFFFFF",
	},
  descriptionCardItem: {
		color: "#757E90",
		textAlign: "center",
    marginVertical: 20
	},
  status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
  online: {
		width: 6,
		height: 6,
		backgroundColor: "#46A575",
		borderRadius: 3,
		marginRight: 4
	},
	offline: {
		width: 6,
		height: 6,
		backgroundColor: "#D04949",
		borderRadius: 3,
		marginRight: 4
	},
  statusText: {
		color: "#757E90",
		fontSize: 12
	},
  actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 30
	},
  miniButton: {
		width: 40,
		height: 40,
		borderRadius: 30,
		backgroundColor: "#FFFFFF",
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: "#363636",
		shadowOffset: { height: 10, width: 0 }
	},
  star: {
		fontFamily: "tinderclone",
		color: "#FFA200"
	},
  button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 }
	},
  like: {
		fontSize: 25,
		fontFamily: ICON_FONT,
		color: LIKE_ACTIONS
	},
  dislike: {
		fontSize: 25,
		fontFamily: ICON_FONT,
		color: DISLIKE_ACTIONS
	},
	flash: {
		fontFamily: ICON_FONT,
		color: FLASH_ACTIONS
	}
});
export default CardItem;
