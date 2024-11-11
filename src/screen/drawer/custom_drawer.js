import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity, Linking, Alert, Share } from "react-native";
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SocialLink } from "./socialLinks";

const Custome = (props) => {
    const navigation = useNavigation();

    // ------------------------Rating App--------------------------
    const openPlayStoreRating = () => {
        const packageName = "com.currencytransfer.ctr";
        const url = `market://details?id=${packageName}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url)
                } else {
                    Alert.alert('Error : Unable to open play store')
                }

            })
            .catch((error) => {
                console.error(error)
            })
    }

    //-------------------Shear App--------------------------------
    const shearAppLink = async () => {
        try {
            const result = await Share.share({
                message:
                    'Download my app from Play Store: https://play.google.com/store/apps/details?id=com.currencytransfer.ctr'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Result activity : " + result.activityType)
                } else {
                    Alert.alert("Succesfull")
                }

            } else if (result.action === Share.dismissedAction) {
                Alert.alert('Not share')
            }

        } catch (error) {
            console.log("Try catch Error" + error)
        }
    }
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#fff', height: responsiveHeight(100) }}>



                <View style={{ alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('about')}>
                        <View style={style.content} >
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '600' }}>About Us</Text>
                            <Icon name="keyboard-arrow-right" size={30} color="#ADADC9" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('contact')}>
                        <View style={style.content}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '600' }}>Contact Us</Text>
                            <Icon name="keyboard-arrow-right" size={30} color="#ADADC9" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openPlayStoreRating}>
                        <View style={style.content}>

                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '600' }}>Rate App</Text>
                            <Icon name="star-rate" size={25} color="#ADADC9" />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shearAppLink}>
                        <View style={style.content}>

                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '600' }}>Share App</Text>
                            <Icon name="share" size={25} color="#ADADC9" />

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <SocialLink />


                </View>
            </View>

        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    content: {
        width: responsiveWidth(45),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        top: 30,
        // borderColor: '#ADADC9',
        // borderWidth: .8,
        borderRadius: 20,
        padding: 10,
        margin: 5,

        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 10,
    },

})
export default Custome;