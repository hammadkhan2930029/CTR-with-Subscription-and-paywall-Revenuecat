import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import DrawerNavigator from "../drawer/drawerNavigator";

const Main = () => {
    const navigation = useNavigation();
   
    return (
        <View style={{ flex: 1}}>
            <DrawerNavigator/>
        </View>
    )
}
export default Main;