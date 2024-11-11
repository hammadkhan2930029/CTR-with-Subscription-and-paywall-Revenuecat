import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import {responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const Navbar = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Animatable.View animation={'fadeInDown'}>
                <StatusBar
                    animated={true}
                    backgroundColor="#ffffff"
                    barStyle={'dark-content'}
                    showHideTransition={'fade'}

                />

                <View style={{
                    backgroundColor: '#ffffff',
                    width: responsiveScreenWidth(100), paddingLeft: 15, shadowColor: "#000", paddingRight: 15, padding: 5,
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: "row",
                   

                }}>
                    <View>
                        <Image style={{resizeMode:'contain', width: responsiveWidth(40),  alignSelf: 'center' }} source={require('../../assets/images/logo/main_logo.png')} />
                    </View>
                    <View style={{ borderColor: '#ADADC9', borderWidth: 1, borderRadius: 50, padding: 5 }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Icon name='menu' size={30} color='#ADADC9' />
                        </TouchableOpacity>
                    </View>

                </View>
            </Animatable.View>

        </SafeAreaView>
    )
}
export default Navbar;