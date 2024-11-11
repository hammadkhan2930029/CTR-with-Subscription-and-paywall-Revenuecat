import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, StatusBar, SafeAreaView } from "react-native";
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('main')
        }, 3000);
    })
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle={'dark-content'}
                showHideTransition={'fade'}

            />
            <View style={{ height: responsiveHeight(100), justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Animatable.Image animation={'zoomIn'} duration={2000} style={{ resizeMode: 'contain', width: responsiveScreenWidth(90), height: responsiveHeight(30),alignSelf:'center' }} source={require('../../assets/images/logo/main_logo.png')} />
            </View>
        </SafeAreaView>
    )
}
export default Splash;