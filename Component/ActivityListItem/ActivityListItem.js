import React from 'react';
import { ListItem } from 'react-native-elements'

export default function ActivityListItem({ navigation, key, activity }) {
    return (
        <ListItem
            key={key}
            title={activity.title}
            leftIcon={{ name: 'flight-takeoff' }}
            style={ key === 0 ? { marginTop: 35 } : {} }
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
