//Style file to loginView.tsx
import {colors} from '../Colors';
import { StyleSheet } from 'react-native';
 
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white,
    
  },
  wellComeMessage:{
    fontSize: 70,
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
  divMessage:{
    marginLeft:20,
    marginBottom:50,
    marginTop:30
  },
  containerInputLogin:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
    marginTop:50
  },
  inputLogin: {
    backgroundColor:colors.white,
    width:300,
    marginBottom:25,
    color:colors.darkBlue,
    fontWeight:'bold',
    fontSize:17,
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 1,
    padding:2,
    paddingVertical:10
  },
  inputLoginFail: {
    backgroundColor:'red',
    width:300,
    marginBottom:25,
    color:'red',
    fontWeight:'bold',
    fontSize:17,
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 1,
    paddingVertical:10
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
    marginTop:10
  },
  forgotPasswordMessage:{
    fontWeight:'bold',
    color:colors.darkBlue,
    marginTop:40
  },
  btnLoginText:{
    color:colors.white,
    fontSize:25,

  },
  lineSocialMedia:{
    fontWeight:'bold',
    color:colors.darkBlue,
    marginTop:30,
    marginBottom:10
  },
  registerMessage:{
    color:colors.darkBlue
  },
  containerimgSocialMedias:{
    flexDirection:"row",
    
  },
  imgSocialMedias:{
    height:40,
    width:40,
    marginHorizontal:20,
    marginTop:10
  },
  imgSocialMediasApple:{
    height:50,
    width:50,
    marginHorizontal:20
  },
  containerBtns:{
    marginTop:70,
    alignItems:"center",
    justifyContent:"center",
  }
});