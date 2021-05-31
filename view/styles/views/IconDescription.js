//Style file to loginView.tsx
import {colors} from '../Colors';
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginHorizontal:20,
    marginVertical:5
  },
  containerTexts: {
    flexDirection: 'column', 
  },
  icon: {
    width: 20, 
    height: 20,
    resizeMode: 'contain',
    margin: 5
  },
  textTitle:{
      color:'#a8a8a8',
      fontSize:15,  
  },
  textValue:{
    color:'#5b5b5b',
    fontSize:12,
    fontWeight:'bold'
}
});