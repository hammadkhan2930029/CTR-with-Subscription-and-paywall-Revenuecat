
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import { responsiveHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import Purchases from "react-native-purchases";

const Splash = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Function to check subscription status
    const checkSubscriptionStatus = async () => {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            // Check if "pro" entitlement is active
            return typeof customerInfo.entitlements.active["pro"] !== "undefined";
        } catch (error) {
            console.error("Error checking subscription status:", error);
            return false;
        }
    };

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            const subscriptionActive = await checkSubscriptionStatus();
            setIsSubscribed(subscriptionActive); // Update subscription status
            setIsLoading(false); // Splash logic complete
        };

        fetchSubscriptionStatus();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (isSubscribed) {
                // Navigate to main screen if subscribed
                navigation.replace('main');
            } else {
                // Navigate to paywall if not subscribed
                navigation.replace('paywall');
            }
        }
    }, [isLoading, isSubscribed, navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                backgroundColor="#fff"
                barStyle={'dark-content'}
                showHideTransition={'fade'}
            />
            <View>
                {isLoading ? (
                    <View style={{ height: responsiveHeight(100), justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Animatable.Image
                            animation={'zoomIn'}
                            duration={2000}
                            style={{
                                resizeMode: 'contain',
                                width: responsiveScreenWidth(90),
                                height: responsiveHeight(30),
                                alignSelf: 'center',
                            }}
                            source={require('../../assets/images/logo/main_logo.png')}
                        />
                    </View>
                ) : null}
            </View>

        </SafeAreaView>
    );
};

export default Splash;
