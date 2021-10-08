//Style file to loginView.tsx
import {colors} from '../Colors';
import { Dimensions, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
 
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop:10
    
  },
  imageCar:{
    height:80,
    width:80
  },
  card: {
      
    height:'81%',
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
    borderRadius:20,
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
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  containerDetailsIcons:{
    alignItems: 'center',
  },
  viewRow: {
    flexDirection: "row"
  },
  viewColumn: {
    flexDirection: "column"
  },

  reportName: {
    marginVertical: 10,
    fontSize: 18
},
reportText: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.red
},
reportContainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: -10,
    marginBottom: 10
},
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100
  },
  buttonReport: {
    backgroundColor: colors.lightBlue,
  },
  buttonCancel: {
    backgroundColor: colors.red,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 19
  },
  modalButtonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: Dimensions.get('window').width - 100,
    marginTop: 15
},
});