import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, styleheet, TextInput, Image, StyleSheet, Pressable, Button, TouchableOpacity, Modal } from "react-native";
import Navbar from "../../normal/Navbar";
import { responsiveHeight, responsiveFontSize, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialIcons";
import DatePicker from "react-native-date-picker";
import { SelectCountry } from 'react-native-element-dropdown';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from "lottie-react-native";



const Home = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const from_date = date.getDate()
    const from_month = date.getMonth() + 1
    const from_year = date.getFullYear()
    const full_date_from = parseInt(from_year) + "-" + parseInt(from_month) + "-" + parseInt(from_date)

    // ---------------------------------
    const [date1, setDate1] = useState(new Date())
    const [open1, setOpen1] = useState(false)
    const to_date = date1.getDate()
    const to_month = date1.getMonth() + 1
    const to_year = date1.getFullYear()
    const full_date_to = parseInt(to_year) + '-' + parseInt(to_month) + '-' + parseInt(to_date)

    // ----------------------------from cuntry----------------------------
    const [From_country, setFrom_Country] = useState(0);
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
    const [To_country, setTo_Country] = useState(0);
    const [local_data2, setlocal_data2] = useState([])
    const ToCountry = async () => {
        try {
            const url = `https://ctr-ksa.com/api/get-to-country`
            const response = await fetch(url)
            const result = await response.json()
                .then((result) => {

                    setlocal_data2(result.msg)

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
    // -----------------------------Center firms-----------------------------------------
    const [firms_data, setfirms_data] = useState([]);
    const [firms, setfirms] = useState(0);

    const center_firms = async () => {
        try {
            const url = `https://ctr-ksa.com/api/get-center-firms`
            const response = await fetch(url)
            const result = await response.json()
                .then((result) => {

                    setfirms_data(result.msg)

                }).catch((e) => {
                    console.log("Api error", e)
                })

        } catch (e) {
            console.log('try catch error', e)
        }
    }
    useEffect(() => {
        center_firms()
    }, [])


    // ---------------------------------history-----------------------------------------
    const [history_data, sethistory_data] = useState([])
    const [visible, setVisible] = useState(false)
    const histry = async () => {
        setVisible(true)
        try {
            const url = `https://ctr-ksa.com/api/get-rates-history/1/${firms}/${From_country}/${To_country}/${full_date_from}/${full_date_to}`
            const response = await fetch(url)
            const result = await response.json()
                .then((result) => {

                    sethistory_data(result.msg)
                    if (result.msg) {
                        setTimeout(() => {

                            setVisible(false)
                        }, 1000);
                    }

                }).catch((e) => {
                    console.log('Api Error', e)
                })

        } catch (e) {
            console.log('try catch error', e)
        }
    }
    useEffect(()=>{
        histry()
    },[])

    return (
        <SafeAreaView >
            <View>
                <Navbar />
            </View>

            <ScrollView style={{ marginBottom: 142 }}>
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={style.loader}
                    speed={1}>
                    <Text>Loading...</Text>
                </AnimatedLoader>


                <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
                <DatePicker
                    modal
                    mode="date"
                    open={open1}
                    date={date1}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate1(date)
                    }}
                    onCancel={() => {
                        setOpen1(false)
                    }}
                />
                <View style={{
                    backgroundColor: '#fff',
                    width: responsiveWidth(95),
                    alignSelf: 'center',
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                    margin: 5,
                    padding: 10
                }}>
                    <View style={{ width: responsiveWidth(95), alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                        <View>
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: '#000', fontWeight: 'bold', padding: 10 }}>History</Text>
                        </View>
                        <View style={{ width: responsiveWidth(90), padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TouchableOpacity activeOpacity={.8} onPress={() => setOpen(true)}>

                                    <View style={style.date_view}>
                                        <Text style={{ fontSize: responsiveFontSize(2), color: '#ADADC9' }}>{full_date_from}</Text>

                                        <Icon name='keyboard-arrow-down' size={25} color='#ADADC9' />

                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ padding: 5, color: 'orange', fontSize: responsiveFontSize(2),fontWeight:'bold' }}>To</Text>
                                </View>
                                <TouchableOpacity activeOpacity={.8} onPress={() => setOpen1(true)}>

                                    <View style={style.date_view}>
                                        <Text style={{ fontSize: responsiveFontSize(2), color: '#ADADC9' }}>{full_date_to}</Text>


                                        <Icon name='keyboard-arrow-down' size={25} color='#ADADC9' />

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                    {/* --------------------------------------------------------------------------- */}


                    <View style={{ width: responsiveWidth(95), padding: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>


                        <View style={{ width: responsiveWidth(90), padding: 5, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 20 }}>

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
                                    placeholder="From country"
                                    searchPlaceholder="Search..."
                                    onChange={e => {
                                        setFrom_Country(e.value);
                                    }}
                                />
                            </View>

                            <View >
                                <Icon name="compare-arrows" size={25} style={{ color: 'orange', fontWeight: 'bold' }} />

                            </View>


                            <View>
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
                                    placeholder="To country"
                                    searchPlaceholder="Search..."
                                    onChange={e => {
                                        setTo_Country(e.value);
                                    }}
                                />
                            </View>

                        </View>
                    </View>
                    {/* ----------------------------------------------------- */}
                    <View style={{ width: responsiveWidth(95), padding: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>


                        <View style={{ width: responsiveWidth(90), padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>

                            <View style={{ alignSelf: 'center' }}>
                                <SelectCountry
                                    style={{
                                        backgroundColor: '#ffffff',
                                        width: responsiveWidth(87),
                                        borderRadius: 30,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.37,
                                        shadowRadius: 7.49,
                                        elevation: 12,
                                        padding: 10,
                                    }}
                                    selectedTextStyle={style.selectedTextStyle}
                                    placeholderStyle={{
                                        fontSize: responsiveFontSize(1.7),
                                        color: '#ADADC9',
                                        padding: 10,
                                        fontWeight: "bold",


                                    }}
                                    imageStyle={style.imageStyle}
                                    iconStyle={style.iconStyle}
                                    maxHeight={200}
                                    value={firms}
                                    data={firms_data}
                                    valueField="value"
                                    labelField="lable"
                                    imageField="image"
                                    placeholder="Firms"
                                    searchPlaceholder="Search..."
                                    onChange={e => {
                                        setfirms(e.value);
                                    }}
                                />
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity onPress={() => histry()} activeOpacity={.8}>

                        <View style={style.search} >
                            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2.2), textAlign: 'center', padding: 10, letterSpacing: 3, fontWeight: '700' }}>SEARCH</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
               

                <View style={{
                    alignSelf: 'center', padding: 10, backgroundColor: "#fff", shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                    width: responsiveWidth(98),
                    borderRadius: 20
                }}>
                    <View style={{ width: responsiveWidth(96), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#00A79D', borderRadius: 30, padding: 10, alignSelf: 'center' }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '400' }}>Center/firms</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '400' }}>Rates</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '400' }}>Last Updtae</Text>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: '400' }}>Amount</Text>

                    </View>
                    {history_data?.map((item, index) => {
                        console.log("no", item)
                        return (
                            <View>
                                    {(item.response !== 'no data') ? (


                                        <View key={index} style={{ width: responsiveWidth(96), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, alignSelf: 'center', borderBottomColor: '#ADADC9', borderBottomWidth: .8 }}>
                                            {((item.bank_to_bank_rates !== null && item.bank_to_bank_rates !== 0) || (item.cash_pickup_rates !== null && item.cash_pickup_rates !== 0) || (item.other_rates !== null && item.other_rates !== 0)) ? (


                                                <View style={{ width: responsiveWidth(24) }}>
                                                    <View>
                                                        <Image style={{ width: responsiveWidth(12), height: responsiveHeight(6), alignSelf: 'center', resizeMode: 'contain' }} source={{ uri: item.center_firm_logo }} />
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000000', textAlign: 'center' }}>{item.center_firm_name}</Text>
                                                    </View>

                                                </View>
                                            ) : null}
                                            <View style={{ width: responsiveWidth(24) }}>
                                                {(item.bank_to_bank_rates !== null) && (item.bank_to_bank_rates !== 0) ? (
                                                    <Text style={style.text}>{"Bank : " + item.bank_to_bank_rates}</Text>
                                                ) : null}

                                                {(item.cash_pickup_rates !== null) && (item.cash_pickup_rates !== 0) ? (
                                                    <Text style={style.text}>{"Cash : " + item.cash_pickup_rates}</Text>
                                                ) : null}

                                                {(item.other_rates !== null) && (item.other_rates !== 0) ? (
                                                    <Text style={style.text}>{'Other : ' + item.other_rates}</Text>
                                                ) : null}
                                            </View>

                                            <View style={{ width: responsiveWidth(24) }}>
                                                {((item.bank_to_bank_rates !== null && item.bank_to_bank_rates !== 0) || (item.cash_pickup_rates !== null && item.cash_pickup_rates !== 0) || (item.other_rates !== null && item.other_rates !== 0)) ? (

                                                    <Text style={style.text}>{item.last_updated_on}</Text>
                                                ) : null}
                                            </View>
                                            <View style={{ width: responsiveWidth(24) }}>
                                                {(item.bank_to_bank_amount !== null && item.bank_to_bank_amount !== '0.00') ? (

                                                    <Text style={style.text2}>{'Bank : ' + item.bank_to_bank_amount}</Text>
                                                ) : null}
                                                {(item.cash_pickup_amount !== null && item.cash_pickup_amount !== '0.00') ? (

                                                    <Text style={style.text2}>{"Cash : " + item.cash_pickup_amount}</Text>
                                                ) : null}
                                                {(item.other_amount !== null && item.other_amount !== '0.00') ? (

                                                    <Text style={style.text2}>{'Other : ' + item.other_amount}</Text>
                                                ) : null}
                                            </View>

                                        </View>
                                    ) : (<Text style={{ textAlign: 'center', padding: 10 }}>History Not found</Text>)}

                            </View>

                        )
                    })}</View>


            </ScrollView>



        </SafeAreaView >

    )
}
const style = StyleSheet.create({
    date_view: {
        backgroundColor: "#fff",
        width: responsiveWidth(40),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderRadius: 30
    },
    list_main_view: {
        width: responsiveWidth(92),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,

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
        margin: 5,
        alignSelf: 'center'


    },
    list: {
        width: responsiveWidth(25),
        padding: 5
    },

    text: { fontSize: responsiveFontSize(1.8), color: '#ADADC9', padding: 5, textAlign: 'center' },
    text2: { fontSize: responsiveFontSize(1.8), color: '#00A79D', padding: 5, textAlign: 'center', fontWeight: '400' },

    // ------------------------------------------
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


    },
    imageStyle: {
        width: responsiveWidth(8),
        height: responsiveHeight(4),
        borderRadius: 50,
    },
    placeholderStyle: {
        fontSize: responsiveFontSize(1.7),
        padding: 5,
        color: '#ADADC9',
        fontWeight: "bold",
        textAlign: 'center',

    },
    selectedTextStyle: {
        fontSize: responsiveFontSize(1.5),
        color: '#000'
    },
    iconStyle: {
        width: responsiveWidth(6),
        color: '#ADADC9',
        fontWeight:'bold'
    },
    search: {

        width: responsiveWidth(87),
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
export default Home;