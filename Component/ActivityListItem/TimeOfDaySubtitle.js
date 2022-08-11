import React from "react";
import { StyleSheet, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {default as MaterialCommunityIcon} from "react-native-vector-icons/MaterialCommunityIcons";
import {default as FeatherIcon} from "react-native-vector-icons/Feather";
import TimeOfDay from "../../Models/TimeOfDay";

export default function TimeOfDaySubtitle({ time }) {
    const morning = time[TimeOfDay.values.morning]   ? { color: '#fcd14d' } : {};
    const noon    = time[TimeOfDay.values.afternoon] ? { color: '#f9d71c' } : {};
    const sunset  = time[TimeOfDay.values.evening]   ? { color: '#FD5E53' } : {};
    const night   = time[TimeOfDay.values.night]     ? { color: '#79C1F1' } : {};
    const iconSize = 16;

    return (
        <View style={{ flexDirection: 'row' }}>
            <FeatherIcon style={[styles.icon, morning, { marginLeft: 0 }]} size={iconSize} name="sunrise" />
            <MaterialCommunityIcon style={[styles.icon, noon]} size={iconSize} name="white-balance-sunny" />
            <MaterialCommunityIcon style={[styles.icon, sunset]} size={iconSize} name="weather-sunset" />
            <FontAwesome5Icon style={[styles.icon, night]} solid={false} size={iconSize} name="moon" />
        </View>
    );
}

export const styles = StyleSheet.create({
    icon: {
        marginTop: 7,
        marginLeft: 7,
        color: '#EAEAEA',
        opacity: 0.8,
    },
});
