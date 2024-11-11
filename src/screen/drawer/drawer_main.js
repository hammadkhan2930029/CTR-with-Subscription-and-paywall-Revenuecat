import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View} from "react-native";
import Bottom_Navigator from "../bottom/bottomNavigator";

const Drawer_main = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Bottom_Navigator />
        </View>
    )
}
export default Drawer_main;