import React from 'react';
import { Screens } from "../../env.ts";
import ActivityList from "../ActivityList/ActivityList";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeTab() {
    return (
        <Stack.Navigator initialRouteName={Screens.ActivityList}>
            <Stack.Screen name={Screens.ActivityList} component={ActivityList} options={{ title: "Activities" }} />
            <Stack.Screen name={Screens.ActivityDetails} component={ActivityDetails} options={{ title: "Activity Details" }} />
        </Stack.Navigator>
    );
}
