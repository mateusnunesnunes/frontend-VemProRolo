import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { ParamList } from "../../controller/routes";

interface Props {
    navigation: StackNavigationProp<ParamList, 'LikePage'>,
    route: RouteProp<ParamList, 'LikePage'>
}

interface State {
}

export default class LikePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
  
        this.state = {
        }
      }
    render() {
        return(
            <View><Text>Like page</Text></View>
        );
    }
}