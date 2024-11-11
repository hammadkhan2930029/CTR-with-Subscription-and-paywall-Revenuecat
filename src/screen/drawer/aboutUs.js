import React,{useEffect,useState} from "react";
import { SafeAreaView, Text, View, Animated } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Navbar from "../normal/Navbar";
import Banner from "../bottom/home/banner_Ads";

export const About = ( ) => {
    return (
        <SafeAreaView>
             
            <Navbar />
            <View>
                <Banner/>
            </View>

            <Animatable.View animation={"fadeInUpBig"} style={{ width: responsiveWidth(95), margin: 15 }}>
                <Text style={{ fontSize: responsiveFontSize(2.5), padding: 15, color: '#000', fontWeight: '700' }}>
                    Find the best Remit Rates.
                </Text>
                <Text style={{ fontSize: responsiveFontSize(2), padding: 15, color: '#000', lineHeight: 30 }}>This application provide the information about the remit rates for the different remittance center across Saudi Arabia. Frequently changing exchange rates and various money transfer providers to choose from, it can get hard to find the best remit exchange rate for your money transfers when you want to send money home to your loved ones. CTR helps by comparing exchange rates from various providers so you do not have to manually search remit rates.

                    You can also visit our website for information.

                    We will keep adding more features in subsequent app releases to give you a uniform experience across web and mobile channels

                    Stay connected with us on Facebook , Twitter or Google+ for updates.</Text>
            </Animatable.View>
        </SafeAreaView>

    )
}
