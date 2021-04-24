//Style file to loginView.tsx
import {colors} from '../Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container:{
        flex: 1,
        alignItems:"center",
    },
    containerMessage:{
        
    },
    codeMessage:{
        fontSize: 25,
        textAlign: 'left',
        color: colors.darkBlue,
        margin:20
    },
    containerInput:{
        flexDirection:"row",
    },
    iput:{
        width: 60,
        height: 60,
        lineHeight: 38,
        fontSize: 30,
        backgroundColor:colors.white,
        textAlign: 'center',
        borderColor: '#cccccc',
        borderWidth: 2,
        borderRadius: 4,
        padding: 12,
        margin:10
    },
    containerBtn:{
        marginTop:50
    },
    btn:{
        width:'45%',
        backgroundColor:colors.lightBlue,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        shadowColor: 'rgba(0.5, 0.5, 0.5, 0.5)',
        shadowOpacity: 1,
        elevation: 2,
        shadowRadius: 1 ,
        shadowOffset : { width: 2, height: 2},
        marginTop:10,
        marginBottom:30
    },
    btnText:{
        color:colors.white,
        fontSize:25,
    },
    containerResend:{
        marginTop:20
    },
    resendText:{
        fontWeight:'bold',
        fontSize:15
    }

});
