import React from 'react';
import { ListItem } from 'react-native-elements'

export default function ActivityListItem({ navigation, index, activity }) {
    return (
        <ListItem
            key={index}
            title={activity.title}
            leftIcon={{ name: 'flight-takeoff' }}
            bottomDivider
            chevron
            onPress={() => {
                navigation.navigate('ActivityDetails', {
                    navigation: navigation,
                    activity: activity,
                });
            }}
        />
    );
}
