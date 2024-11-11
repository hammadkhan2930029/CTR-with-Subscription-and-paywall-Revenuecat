import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Splash from './normal/splash'
import Main from './normal/main'
import Banner from './bottom/home/banner_Ads'


const Stack = createStackNavigator()
const App_Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='splash' component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name='main' component={Main} options={{headerShown:false}}/>
                <Stack.Screen name='banner' component={Banner} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App_Navigator;