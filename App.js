import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import App_Navigator from './src/screen/AppNavigator';
import { ToastProvider } from 'react-native-toast-notifications'

const App = () => {
  return (
    <ToastProvider>

      <App_Navigator />
    </ToastProvider>
  )

}
export default App;