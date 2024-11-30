import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import Splash from './normal/splash'
import Main from './normal/main'
import PaywallScreen from './normal/paywall/paywall'; 



const Stack = createStackNavigator()
const App_Navigator = () => {
   

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='splash' component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name='paywall' component={PaywallScreen} options={{ headerShown: false }} />
                <Stack.Screen name='main' component={Main} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App_Navigator;