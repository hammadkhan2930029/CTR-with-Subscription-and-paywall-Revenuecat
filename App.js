import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import App_Navigator from './src/screen/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications'
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const REVENUECAT_API_KEY = "goog_eAVKIuhmJmHbGRztyaLCjPwPGzI";

const App = () => {
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);


    if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: REVENUECAT_API_KEY,
        appUserID: null,
      });
    }
    Purchases.getOfferings().then((result) => {
      console.log("Get offerings ", result)
    })

  }, []);

  return (
    <ToastProvider>

      <App_Navigator />
    </ToastProvider>
  )

}
export default App;