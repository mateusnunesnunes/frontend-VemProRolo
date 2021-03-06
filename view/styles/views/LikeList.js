//Style file to loginView.tsx
import {colors} from '../Colors';
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    height:'85%',
  },
  containerButton: {
    backgroundColor:'transparent',
    marginTop:15,
    marginHorizontal:20,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterButton: {
    marginRight:120
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
    height:65,
    width:65
  },
  imageFilter:{
    height:50,
    width:50
  }

  
});