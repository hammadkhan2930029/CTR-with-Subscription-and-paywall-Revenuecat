import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, styleheet, TextInput, Image, StyleSheet, Pressable, Button, TouchableOpacity } from "react-native";
import Navbar from "../../normal/Navbar";
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";
import { SelectCountry } from 'react-native-element-dropdown';
import Banner from "./banner_Ads";


const Home = () => {
    const navigation = useNavigation();

    const [input, setinput] = useState('1')
    const [visible, setVisible] = useState(true);

    // ----------------------------from cuntry----------------------------
    const [From_country, setFrom_Country] = useState('0');
    const [local_data, setlocal_data] = useState([])
    const fromCountry = async () => {
        try {
            const url = `https://ctr-ksa.com/api/get-from-country`
            const response = await fetch(url)
            const result = await response.json()
                .then((result) => {

                    setlocal_data(result.msg)

                }).catch((e) => {
                    console.log('Api error', e)
                })

        } catch (error) {
            console.log('try catch error', error)
        }
    }
    useEffect(() => {
        fromCountry()
    }, [])

    // ----------------------To Country----------------------
    const [To_country, setTo_Country] = useState('0');
    const [local_data2, setlocal_data2] = useState([])
    const ToCountry = async () => {
        try {
            const url = `https://ctr-ksa.com/api/get-to-country`
            const response = await fetch(url)
            const result = await response.json()
                .then((result) => {
                    setlocal_data2(result.msg)
                    console.log('to country',result.msg)

                }).catch((e) => {
                    console.log('Api error', e)
                })

        } catch (error) {
            console.log('try catch error', error)
        }
    }
    useEffect(() => {
        ToCountry()
    }, [])

    // ----------------------Rates------------------------
    const [data, setData] = useState([])
    const rates = async () => {
        setVisible(true)
        try {
            const url = `https://ctr-ksa.com/api/get-rates/${input}/${From_country}/${To_country}`
            const response = await fetch(url)
            const result = response.json()
                .then((result) => {
                    if (result.msg) {

                        setData(result.msg)
                        setVisible(false);

                    }


                }).catch((e) => {
                    console.log("Api errors", e)
                })

        } catch (e) {
            console.log("try catch error", e)
        }
    }
    useEffect(() => {
        rates()
    }, [])



    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View>
                <Navbar />
            </View>
            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={style.loader}
                speed={1}>
                <Text>Loading...</Text>
            </AnimatedLoader>
            <ScrollView style={{ marginBottom: 70 }}>

                <Animatable.View animation={'fadeInDown'} style={style.main}>

                    {/* ---------------------------------------------------------- */}
                    <View style={style.main_dropdwon_view}>


                        <View>
                            <SelectCountry
                                style={style.dropdown}
                                selectedTextStyle={style.selectedTextStyle}
                                placeholderStyle={style.placeholderStyle}
                                imageStyle={style.imageStyle}
                                iconStyle={style.iconStyle}
                                maxHeight={200}
                                value={From_country}
                                data={local_data}
                                valueField="value"
                                labelField="lable"
                                imageField="image"
                                placeholder="From Country"
                                searchPlaceholder="Search..."
                                onChange={e => {
                                    setFrom_Country(e.value);
                                }}
                            />
                        </View>


                        <View>
                            <Icon name="swap-horizontal" size={30} color='#ADADC9' />

                        </View>



                        <View >
                            <SelectCountry
                                style={style.dropdown}
                                selectedTextStyle={style.selectedTextStyle}
                                placeholderStyle={style.placeholderStyle}
                                imageStyle={style.imageStyle}
                                iconStyle={style.iconStyle}
                                maxHeight={200}
                                value={To_country}
                                data={local_data2}
                                valueField="value"
                                labelField="lable"
                                imageField="image"
                                placeholder="To Country"
                                searchPlaceholder="Search..."
                                onChange={e => {
                                    setTo_Country(e.value);
                                }}
                            />
                        </View>

                    </View>


                    <View style={style.input_style}>
                        <View style={style.input_view}>
                            <TextInput style={{ padding: 10, color: "#000" }}
                                keyboardType="numeric"
                                placeholder='Amount'
                                placeholderTextColor='#ADADC9'
                                value={input}
                                onChangeText={(text) => setinput(text)}
                            />
                        </View>
                        <TouchableOpacity disabled={input == 0} activeOpacity={.8} onPress={() => rates()}>
                            <View style={style.calculate}>
                                <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', textAlign: 'center', fontWeight: '700', padding: 10, letterSpacing: 3 }}>
                                    CALCULATE
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>

                {/* ----------------------------Ads------------------------------------ */}
                <View>
                    <Banner/>
                </View>

                {/* ---------------------table----------------------------- */}



                <View style={{ alignSelf: 'center' }}>

                    {data?.map((item, index) => {

                        return (
                            <View>
                                {item.response == 'no data' ? (<Text style={{ color: '#ADADC9', textAlign: 'center' }}> Not Available </Text>) : (
                                    <View style={style.list_main_view} key={index}>

                                        <View style={{ justifyContent: "center", alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                                            <Image style={{ width: responsiveWidth(16), height: responsiveHeight(5), borderRadius: 15, resizeMode: 'contain' }} source={{ uri: item.center_firm_logo }} />
                                            <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000000', fontWeight: '600', paddingLeft: 5, textAlign: 'center' }}>{item.center_firm_name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(90), padding: 5 }}>
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#ADADC9' }}>Last Update</Text>

                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: '#ADADC9', }}>{item.last_updated_on}</Text>
                                        </View>

                                        {(item.bank_to_bank_rates !== null && item.bank_to_bank_rates !== 0) ? (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: responsiveWidth(90), alignSelf: 'center', }}>
                                                <View style={style.list}>
                                                    <Text style={style.head}>Bank Rates</Text>
                                                    <Text style={{ color: 'orange', textAlign: 'center', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>{item.bank_to_bank_rates || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.head}>Charges</Text>
                                                    <Text style={style.text}>{item.bank_to_bank_charges || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.head}>Time</Text>
                                                    <Text style={style.text}>{item.bank_to_bank_transfer_time || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.head}>Amount</Text>
                                                    <Text style={style.text}>{item.bank_to_bank_amount || " "}</Text>
                                                </View>
                                            </View>
                                        ) : null}

                                        {/* ----------------------------------------------------------------- */}
                                        {(item.cash_pickup_rates !== null && item.cash_pickup_rates !== 0) ? (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: responsiveWidth(90), alignSelf: 'center' }}>
                                                <View style={style.list}>
                                                    <Text style={style.head}>Cash Pickup</Text>
                                                    <Text style={{ color: 'orange', textAlign: 'center', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>{item.cash_pickup_rates || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.text}>{item.cash_pickup_charges || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.text}>{item.cash_pickup_transfer_time || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.text}>{item.cash_pickup_amount || " "}</Text>
                                                </View>
                                            </View>
                                        ) : null}
                                        {/* ----------------------------------------------------------------------------- */}
                                        {(item.other_rates !== null) && (item.other_rates !== 0) ? (
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: responsiveWidth(90), alignSelf: 'center' }}>
                                                <View style={style.list}>
                                                    <Text style={style.head}>{item.other_title || "Other"}</Text>
                                                    <Text style={{ color: 'orange', textAlign: 'center', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>{item.other_rates || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.text}>{item.other_charges || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.text}>{item.other_transfer_time || " "}</Text>
                                                </View>
                                                <View style={style.list}>

                                                    <Text style={style.text}>{item.other_amount || " "}</Text>
                                                </View>
                                            </View>
                                        ) : null}
                                        {/* ---------------------------------------------- */}
                                        {item.description !== null ? (

                                            <View style={{ padding: 10 }}>
                                                <Text style={style.text}>{item.description || ''}</Text>

                                            </View>
                                        ) : null}
                                    </View>
                                )}

                            </View>


                        )

                    })}



                </View>
            </ScrollView>



        </SafeAreaView >

    )
}
const style = StyleSheet.create({
    main: {
        width: responsiveWidth(95),
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        marginTop: 10,
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
    main_dropdwon_view: {
        width: responsiveWidth(92),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 15

    },


    input_view: {
        width: responsiveWidth(90),
        backgroundColor: '#F5F5F5',

        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 15,
        borderColor: '#F5F5F5',
        borderWidth: 1



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
    recent_update: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5
    },
    list_main_view: {
        width: responsiveWidth(95),
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        padding: 10,
        margin: 5


    },
    list: {
        width: responsiveWidth(25),
        padding: '2%',

    },
    first: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
        width: responsiveWidth(90),

    },
    head: { fontSize: responsiveFontSize(1.7), color: '#000', fontWeight: '400', padding: 5, textAlign: 'center' },
    text: { fontSize: responsiveFontSize(1.8), color: '#ADADC9', padding: 5, textAlign: 'center' },
    // --------------------------------------------------
    dropdown: {
        backgroundColor: '#ffffff',
        width: responsiveWidth(40),
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        padding: '3%',
        borderColor: '#F5F5F5',
        borderWidth: 1
    },
    imageStyle: {
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        borderRadius: 50,
    },
    placeholderStyle: {
        fontSize: responsiveFontSize(1.9),
        color: '#ADADC9',
        fontWeight: "bold",
        textAlign: 'center',
    },
    selectedTextStyle: {
        fontSize: responsiveFontSize(1.7),
        color: '#000',
        fontWeight: "bold",

    },
    iconStyle: {
        width: responsiveWidth(5),
        height: responsiveHeight(3),
        color: '#ADADC9'
    },
    loader: {
        width: 100,
        height: 100,
    },


})
export default Home;