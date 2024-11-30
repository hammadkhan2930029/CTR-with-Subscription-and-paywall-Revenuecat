import Purchases from "react-native-purchases";

 const checkSubscriptionStatus = async () => {
    try {
        const customerInfo = await Purchases.getCustomerInfo();
        if (customerInfo.entitlements.active['entl17b9c21573']) {
            return true; // Active subscription
        } else {
            return false; // No active subscription
        }
    } catch (error) {
        console.log('Error checking subscription status:', JSON.stringify(error) );
        return false;
    }
};
