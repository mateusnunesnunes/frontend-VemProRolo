//Style file to loginView.tsx
import {colors} from '../Colors';
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    height:'85%',
  },
  containerButton: {
    backgroundColor:'transparent',
    marginTop:2,
    marginHorizontal:20,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  likeButton: {
    margin:2
  },
  dislikeButton: {
    margin:2
  },
  imageLike:{
    height:70,
    width:70
  },
  imageDislike:{
    height:70,
    width:70
  }

  
});