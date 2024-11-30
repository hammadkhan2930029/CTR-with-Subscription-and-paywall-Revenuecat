import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import Navbar from "../normal/Navbar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { object, string, number, date, InferType } from 'yup';
import { Formik } from "formik";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";
import { useToast } from "react-native-toast-notifications";
import { SocialLink } from "./socialLinks";

let schema = object({

    email: string()
        .email('Please enter valid email')
        .required('email in requird'),

    name: string()
        .required('name is requird'),

    message: string()
        .required('message is requird'),
    subject: string()
        .required('Subject is requird'),
    phone: string()
        .required('Phone number is requird'),

});


export const Contact = () => {
    const [visible, setVisible] = useState(true);
    const toast = useToast();
    const [data, setData] = useState([])
    const [facebook, setfacebook] = useState('')
    const get_contact_info = async () => {
        try {
            const url = `https://ctr-ksa.com/api/get-contact-info`
            const response = await fetch(url)
            await response.json()
                .then((result) => {

                    console.log(result.msg)
                    setData(result.msg)
                    const fb = result.msg.map((item) => item.facebook)
                    if (result.msg) {
                        setVisible(false)
                    }
                    setfacebook(fb)

                }).catch((e) => {
                    console.log('api error', e)

                })

        } catch (error) {
            console.log('try catch error', error)
        }
    }
    useEffect(() => {
        get_contact_info()
    }, [])
    // --------------------------------------------------------
    const post_contact_info = async (value) => {
        setVisible(true)
        var formData = new FormData();
        formData.append('email', value.email);
        formData.append('name', value.name);
        formData.append('subject', value.subject);
        formData.append('message', value.message);
        formData.append('phone', value.phone);

        const url = `https://ctr-ksa.com/api/contact`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
                .then((result) => {
                    console.log(result)
                    toast.show("Send successfully", {
                        type: "success",
                        placement: "top",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                    });
                    setVisible(false)
                }).catch((e) => {
                    console.log('api error', e)
                })

        } catch (error) {
            console.log('try catch error', error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navbar />
           
            <ScrollView >
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={style.loader}
                    speed={1}>
                    <Text>Loading...</Text>
                </AnimatedLoader>
                <Formik
                    initialValues={{ subject: '', email: '', message: '', name: '', phone: '' }}
                    onSubmit={(value, { resetForm }) => {
                        post_contact_info(value)
                        resetForm()
                    }}
                    validateOnMount={true}
                    validationSchema={schema}
                >
                    {({ handleBlur, handleChange, handleSubmit, values, touched, errors, isValid }) => (
                        <View style={{ width: responsiveWidth(98), alignSelf: 'center' }}>
                            <View style={{ paddingTop: 5 }}>
                                <Text style={{ fontSize: responsiveFontSize(2.5), color: '#000', padding: 5, fontWeight: '700' }}>Send us an Email</Text>
                                <Text style={{ fontSize: responsiveFontSize(2), color: '#000', padding: 5 }}>Please wirte out your message here,and we will get back to you through email as soon as possible</Text>

                            </View>

                            <View style={style.input_view}>

                                <TextInput
                                    style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                                    placeholder="Subject"
                                    placeholderTextColor='#ADADC9'
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={values.subject}
                                    onChangeText={handleChange('subject')}
                                    onBlur={handleBlur('subject')}
                                />
                            </View>

                            {(errors.subject && touched.subject) && <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.subject}</Text>}

                            <View style={style.input_view}>
                                <TextInput
                                    style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                                    placeholder="Name"
                                    placeholderTextColor='#ADADC9'
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                            </View>

                            {(errors.name && touched.name) && <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.name}</Text>}

                            <View style={style.input_view}>
                                <TextInput
                                    style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                                    placeholder="Email"
                                    placeholderTextColor='#ADADC9'
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                            </View>

                            {(errors.email && touched.email) && <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.email}</Text>}

                            <View style={style.input_view}>
                                <TextInput
                                    style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                                    placeholder="Phone"
                                    placeholderTextColor='#ADADC9'
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                />
                            </View>

                            {(errors.phone && touched.phone) && <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.phone}</Text>}

                            <View style={style.input_view}>
                                <TextInput
                                    style={{ padding: 5, width: responsiveWidth(70), color: '#000' }}
                                    placeholder="Message"
                                    placeholderTextColor='#ADADC9'
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    multiline={true}
                                    numberOfLines={3}
                                    value={values.message}
                                    onChangeText={handleChange('message')}
                                    onBlur={handleBlur('message')}
                                />
                            </View>

                            {(errors.message && touched.message) && <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.message}</Text>}

                            <TouchableOpacity activeOpacity={.8} onPress={handleSubmit} disabled={!isValid}>

                                <View style={style.btn}>
                                    <Text style={{ fontSize: responsiveFontSize(2.5), color: '#fff', textAlign: 'center', fontWeight: '700', padding: 10, letterSpacing: 5 }}>SEND</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View style={{ width: responsiveWidth(98), alignSelf: 'center' }}>
                    {data.map((item, index) => {
                        return (
                            <View key={index}>
                                <View style={{ padding: 5 }}>

                                    <Text style={{ fontSize: responsiveFontSize(2.6), color: '#000', padding: 5, fontWeight: '700' }}>Contact Information</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000', padding: 5, fontWeight: '500' }}>Postal information</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000', padding: 5, }}>{item.address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Icon name='email' size={30} color="#000" />
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000', padding: 5, }}>{item.email}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Icon name='phone' size={30} color="#000" />
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000', padding: 5, }}>{item.phone}</Text>

                                </View>

                                <View >

                                    <SocialLink />

                                </View>



                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
const style = StyleSheet.create({
    input_view: {
        width: responsiveWidth(95),
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 10,
        borderColor: '#f5f5f5',
        borderWidth: .8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 8,

    },
    btn: {
        width: responsiveWidth(95),
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
    loader: {
        width: 100,
        height: 100,
    },
})