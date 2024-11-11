import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import Drawer_main from "./drawer_main";
import Custome from "./custom_drawer";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { About } from "./aboutUs";
import { Contact } from "./contact";


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {


    return (
        <Drawer.Navigator drawerContent={(props) => <Custome {...props} />} screenOptions={{
             headerShown: false, drawerStyle: {
                width: responsiveWidth(50),
                
            }
        }}>
            <Drawer.Screen name="drawer_main" component={Drawer_main} options={{ headerShown: false }} />
            <Drawer.Screen name="about" component={About} options={{ headerShown: false }} />
            <Drawer.Screen name="contact" component={Contact} options={{ headerShown: false }} />


        </Drawer.Navigator>
    )
}
export default DrawerNavigator;