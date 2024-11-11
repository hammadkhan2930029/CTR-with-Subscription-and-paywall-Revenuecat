import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground } from "react-native";
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-2824183494292170/7151016457';


const Banner = () => {
  console.log("Is development mode?", __DEV__);

    
    return (
       
         <BannerAd
         unitId={adUnitId}
         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
         requestOptions={{
           networkExtras: {
             collapsible: 'bottom',
           },
         }}
       />

    )
}

export default Banner;