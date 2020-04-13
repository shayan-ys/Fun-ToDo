import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import {currentSeason, dayOfWeek, FilterName, partOfDay} from "../../env";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import React from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

function FilterActivity(activity, filters) {
    return activity.price <= filters[FilterName.PriceUnder]
        && (filters[FilterName.AllWeek] || activity.daysOfWeek[dayOfWeek])
        && (filters[FilterName.AllDay]  || activity.timesOfDay[partOfDay])
        && (filters[FilterName.AllSeasons]  || activity.seasons[currentSeason])
}

export default function FilteredActivityList({ activities, filters, resetFilter, navigation }) {

    const filteredActivities = activities.filter((activity) => FilterActivity(activity, filters));

    const allActivitiesCount = activities.length;
    const filteredActivitiesCount = filteredActivities.length;

    return (
        <>
            {filteredActivities.map((activity, i) => <ActivityListItem index={i} activity={activity} navigation={navigation} />)}

            {/*Show All*/}
            {allActivitiesCount !== filteredActivitiesCount &&
                <Button
                    title={'Show all ' + allActivitiesCount + ' activities'}
                    type='clear'
                    onPress={resetFilter}
                    icon={<FontAwesome5Icon name='chevron-down' size={17} style={{ color: '#999999' }}/>}
                    titleStyle={{ color: '#777777', marginLeft: 5, fontSize: 16 }}
                    buttonStyle={{ marginTop: 17 }}
                />
            }
        </>
    );
}
