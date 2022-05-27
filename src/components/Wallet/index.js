import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen, { screenOptions as HomeOptions} from "./screens/Home"
import Settings from "./screens/Settings";
import Actions from "./screens/Actions";
import News from "./screens/News";
import Portfolio from "./screens/Portfolio";
import Prices from "./screens/Prices";

import TabBar from "./components/TabBar";

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} options={HomeOptions}/>
            <HomeStackNavigator.Screen name="News" component={News}/>
        </HomeStackNavigator.Navigator>
    );
};


const TabBarNavigator = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <TabBarNavigator.Navigator tabBar={(props) => <TabBar {... props} />} >
            <TabBarNavigator.Screen name="主頁" component={HomeNavigator} options={{headerShown: false}}  />
            <TabBarNavigator.Screen name="我的" component={Portfolio}  options={{headerShown: false}} />
            <TabBarNavigator.Screen name="Actions" component={Actions}  options={{headerShown: false}} />
            <TabBarNavigator.Screen name="面值" component={Prices}  options={{headerShown: false}} />
            <TabBarNavigator.Screen name="設定" component={Settings}  options={{headerShown: false}} />
        </TabBarNavigator.Navigator>
    )
}

const Wallet = () => {
    return(
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}

export default Wallet;