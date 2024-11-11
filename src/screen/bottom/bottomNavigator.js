import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text } from 'react-native'
import Home from "./home/home";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight } from "react-native-responsive-dimensions";
import News_letter from "./news_letter/news-letter";
import History from "./history/history";

const Tab = createBottomTabNavigator();

const Bottom_Navigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
                let iconName;
                if (route.name === 'home') {
                    iconName = focused ? "home" : "home-outline";
                }
                else if (route.name === 'history') {
                    iconName = focused ? "history" : "history";
                } else if (route.name === 'news_letter') {
                    iconName = focused ? "newspaper-variant" : "newspaper-variant-outline";
                }
                return <Icon name={iconName} size={size} color={color} />
            },
            tabBarInactiveTintColor: '#ADADC9',
            tabBarActiveTintColor: '#000000',
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#fff',
                height: responsiveHeight(8),
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,

            }

        })}>
            <Tab.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="history" component={History} options={{ headerShown: false }} />
            <Tab.Screen name="news_letter" component={News_letter} options={{ headerShown: false }} />


          

        </Tab.Navigator>
    )
}
export default Bottom_Navigator;