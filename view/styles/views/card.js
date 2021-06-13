//Style file to loginView.tsx
import {colors} from '../Colors';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
 
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop:40
    
  },
  card: {
      
    height:'80%',
    width:'90%',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    backgroundColor:colors.white,
    elevation: 6,
    borderRadius:10,
  },
  logo: {
    resizeMode: "cover",
    height: 180,
    width: '100%'
  },
  containerDescription: {
    flex:1,
    margin:10,
  },
  containerDescriptionTexts: {
    padding:10,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  descriptionTitle: {
      fontSize:20,
      fontWeight:'bold',
      color: colors.grey,
  },
  description:{
    marginTop: 10,
    color: colors.grey,
  },
  containerDetails: {
    flex:1,
    margin:10,
  },
  containerDetailsIcons:{
    alignItems: 'center',
  },
  viewRow: {
    flexDirection: "row"
  },
  viewColumn: {
    flexDirection: "column"
  }


});