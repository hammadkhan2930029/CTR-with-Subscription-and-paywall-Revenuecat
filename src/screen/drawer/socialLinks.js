import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";





export const SocialLink = () => {


    return (
        <SafeAreaView >


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')} >

                    <Icon name='facebook' size={30} color="#28282B" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://mail.google.com')}>

                    <Icon name='google' size={30} color="#28282B" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com')}>

                    <Icon name='instagram' size={30} color="#28282B" />
                </TouchableOpacity>


            </View>

        </SafeAreaView>

    )
}
