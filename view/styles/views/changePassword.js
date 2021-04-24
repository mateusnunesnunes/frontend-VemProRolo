import {colors} from '../Colors';
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.white,
    },
    divMessage:{
        marginLeft:20,
        marginBottom:100
    },
    wellComeMessage:{
        fontSize: 50,
        textAlign: 'left',
        color: colors.darkBlue,
        margin: 0,
        paddingTop:0
    },
    descriptonMessage:{
    fontSize: 20,
    color: colors.darkBlue,
    textAlign:'left',
    paddingTop:0
    },
    containerInputLogin:{
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30
    },
    inputLogin: {
        backgroundColor:colors.white,
        width:'70%',
        marginBottom:25,
        color:colors.darkBlue,
        fontWeight:'bold',
        fontSize:17,
        borderBottomColor: colors.darkBlue,
        borderBottomWidth: 1,
        paddingVertical:10
    },
    containerBtns:{
        alignItems:"center",
        justifyContent:"center",
        marginBottom:40
    },
    btnLogin:{
        width:'45%',
        backgroundColor:colors.lightBlue,
        paddingVertical:5,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        shadowColor: 'rgba(0.5, 0.5, 0.5, 0.5)',
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 1 ,
        shadowOffset : { width: 2, height: 2},
        marginTop:20,
        marginBottom:30
    },
    btnLoginText:{
    color:colors.white,
    fontSize:25,

    }

});