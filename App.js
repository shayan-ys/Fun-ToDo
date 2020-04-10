import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from "./Component/HomeTab/HomeTab";
import { ThemeProvider } from 'react-native-elements';

function SettingsTab() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

const theme = {};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeTab} />
                <Tab.Screen name="Settings" component={SettingsTab} />
            </Tab.Navigator>
        </NavigationContainer>
    </ThemeProvider>
  );
};
