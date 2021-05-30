import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { ParamList } from "../../controller/routes";

interface Props {
    navigation: StackNavigationProp<ParamList, 'ProfilePage'>,
    route: RouteProp<ParamList, 'ProfilePage'>
}

interface State {
}

export default class ProfilePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
        }
      }
    render() {
        return(
            <View><Text>Profile Page</Text></View>
        );
    }
}