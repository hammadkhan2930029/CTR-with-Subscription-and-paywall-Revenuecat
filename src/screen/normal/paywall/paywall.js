
import RevenueCatUI from "react-native-purchases-ui";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Purchases from "react-native-purchases"; // Ensure this is imported
import { useToast } from "react-native-toast-notifications";

const PaywallScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const toast = useToast()

    // Function to check subscription status
    const checkSubscriptionStatus = async () => {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            if (typeof customerInfo.entitlements.active["pro"] !== "undefined") {
                return true; // Active subscription
            } else {
                return false; // No active subscription
            }
        } catch (error) {
            console.log("Error checking subscription status:", error);
            return false;
        }
    };

    // Fetch subscription status on component mount
    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            const subscriptionActive = await checkSubscriptionStatus();
            setIsSubscribed(subscriptionActive);
            setIsLoading(false); // Stop loading
        };

        fetchSubscriptionStatus();
    }, []);

    // Navigate to the main screen if subscribed
    useEffect(() => {
        if (!isLoading && isSubscribed) {
            navigation.replace("main");
        }
    }, [isLoading, isSubscribed, navigation]);

    // Handle paywall purchase success
    const handlePurchaseCompleted = async () => {
        const subscriptionActive = await checkSubscriptionStatus();
        if (subscriptionActive) {
        
            toast.show("Subscription successful! Redirecting to the main screen.", {
                type: "success",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
            navigation.replace("main");
        } else {
    
            toast.show("Something went wrong. Please try again.", {
                type: "warning",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
            
        }
    };

    return (
        <RevenueCatUI.Paywall
            onPurchaseCompleted={handlePurchaseCompleted} // Handle subscription success
            onPurchaseCancelled={() => {
            
                toast.show("Purchase cancelled.", {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            }} // Handle subscription cancellation
            onError={(error) => {
                toast.show("Error during purchase: ", error.message, {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                
                console.log("Error during purchase:", error);
            }} // Handle any errors
        />
    );
};

export default PaywallScreen;
