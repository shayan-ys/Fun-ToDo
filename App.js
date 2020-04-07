import * as React from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityDetails from "./Component/ActivityDetails/ActivityDetails";
import ActivityList from "./Component/ActivityList/ActivityList";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <ActivityList navigation={navigation} />
            <Button
                title="Add"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('ActivityDetails', {
                        navigation: navigation
                    });
                }}
            />
        </View>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ActivityDetails" component={ActivityDetails} options={{ title: "Activity Details" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
