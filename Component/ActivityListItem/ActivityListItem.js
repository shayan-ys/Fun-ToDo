import React from 'react';
import { ListItem } from 'react-native-elements'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import TimeOfDaySubtitle from "./TimeOfDaySubtitle";

export default function ActivityListItem({ navigation, index, activity }) {
    return (
        <ListItem
            key={index}
            title={activity.title}
            // leftIcon={{ name: 'flight-takeoff' }}
            subtitle={<TimeOfDaySubtitle time={activity.timesOfDay} />}
            bottomDivider
            chevron
            rightTitle={'$'.repeat(activity.price)}
            onPress={() => {
                navigation.navigate('ActivityDetails', {
                    activity: JSON.stringify(activity),
                });
            }}
        />
    );
}
