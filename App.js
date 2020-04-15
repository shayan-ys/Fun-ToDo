import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from "./env";
import HomeTab from "./Component/HomeTab/HomeTab";
import AboutTab from "./Component/AboutTab/AboutTab";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) =>
                        <FontAwesome5Icon
                            name={route.name === Tabs.Home ? 'home' : 'user'}
                            solid={focused}
                            size={size}
                            color={color}
                        />
                })}
                tabBarOptions={{
                    activeBackgroundColor: '#FAFAFA',
                    activeTintColor: '#DD2C00',
                    inactiveTintColor: '#757575',
                    showLabel: false,
                }}
            >
                <Tab.Screen name={Tabs.Home}  component={HomeTab} />
                <Tab.Screen name={Tabs.About} component={AboutTab} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
