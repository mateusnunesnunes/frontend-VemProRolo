import {colors} from '../../Colors';
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
    inputLogin: {
        backgroundColor:colors.white,
        width:300,
        marginBottom:25,
        color:colors.darkBlue,
        fontWeight:'bold',
        fontSize:17,
        borderBottomColor: colors.darkBlue,
        borderBottomWidth: 1,
        paddingVertical:10
      },
    errorText: {
      color:colors.red,
      width:300,
    }
});


