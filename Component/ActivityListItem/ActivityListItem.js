import React from 'react';
import {View, Text} from "react-native";

export default function ActivityListItem({navigation, item}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('ActivityDetails', {
                        navigation: navigation,
                        item: item,
                    });
                }}
            >{item.title}</Text>
        </View>
    );
}
