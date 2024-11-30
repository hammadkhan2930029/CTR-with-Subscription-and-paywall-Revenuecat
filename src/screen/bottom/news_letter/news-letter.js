import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, styleheet, TextInput, Image, StyleSheet, Pressable, Button, TouchableOpacity, Alert } from "react-native";
import Navbar from "../../normal/Navbar";
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "react-native-toast-notifications";

const News_letter = () => {
    const navigation = useNavigation();
    const toast = useToast();
    // -------------------------------------------------
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailValidError('email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

    // -------------------------------------------------
    const [phone, setphone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const handleValidPhone = val => {
        let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


        if (val.length === 0) {
            setPhoneError('phone number must be enter');
        }
      
    };

    console.log(email, phone)
    // ---------------------------------------------------------
    const subscribe = async () => {
        var formData = new FormData();
        formData.append('email', email);
        formData.append('phone', phone);

        const url = `https://ctr-ksa.com/api/subscribe`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result.msg);

            const check = result.msg.map((item) => item.response);
            if (check.includes("subscribe successfully")) {
                setEmail('');
                setphone('');
                toast.show("subscribe successfully", {
                    type: "success",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            } else {
                toast.show("already subscribed", {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            }
        } catch (error) {
            console.error('Fetch error:', error);
        
            toast.show('Something went wrong. Please try again later.', {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
        }
    };





    return (
        <SafeAreaView >
            <View>
                <Navbar />
            </View>
            <Animatable.View animation={'fadeInDown'} style={style.main}>



                <View style={style.input_style}>
                    <View>
                        <Text style={{ fontSize: responsiveFontSize(2), textAlign: 'center', color: "#000", fontWeight: '600', padding: 10 }}>Subscribe To Our News letter!</Text>
                    </View>
                    <View style={style.input_view}>
                        <Icon name="email" size={30} color="#ADADC9" />
                        <TextInput
                            style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                            placeholder="Email"
                            placeholderTextColor='#ADADC9'
                            value={email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={value => {
                                setEmail(value);
                                handleValidEmail(value);
                            }}

                        />
                    </View>
                    {emailValidError && <Text style={{ color: 'red' }}>{emailValidError}</Text>}
                    <View style={style.input_view}>
                        <Icon name="phone" size={30} color="#ADADC9" />

                        <TextInput
                            style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                            keyboardType="numeric"
                            placeholder="Phone Number"
                            placeholderTextColor='#ADADC9'
                            onChangeText={value => {
                                setphone(value);
                                handleValidPhone(value);
                            }}
                            value={phone}

                        />
                    </View>
                    {phoneError && <Text style={{ color: 'red' }}>{phoneError}</Text>}

                    {(email && phone) ? (

                        <TouchableOpacity activeOpacity={.8} onPress={() => subscribe()}  >
                            <View style={style.calculate}>
                                <Text style={{ fontSize: responsiveFontSize(2.5), color: '#fff', textAlign: 'center', fontWeight: '400', padding: 8, letterSpacing: 3 }}>
                                    SUBMIT
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={style.calculate}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#fff', textAlign: 'center', fontWeight: '700', padding: 8, letterSpacing: 3 }}>
                                SUBMIT
                            </Text>
                        </View>
                    )}

                </View>


            </Animatable.View>
           
        </SafeAreaView >

    )
}
const style = StyleSheet.create({
    main: {
        width: responsiveWidth(95),
        backgroundColor: "#fff",
        padding: 20,
        margin: 5,
        marginTop: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        alignSelf: 'center',

    },


    input_view: {
        width: responsiveWidth(90),
        backgroundColor: '#F5F5F5',
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 15,
        borderColor: '#F5F5F5',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8




    },
    calculate: {

        width: responsiveWidth(90),
        backgroundColor: "#00A79D",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        alignSelf: 'center',
        marginTop: 15


    },




})
export default News_letter;