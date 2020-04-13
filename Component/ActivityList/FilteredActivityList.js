import {Text, View} from "react-native";
import {currentSeason, dayOfWeek, FilterName, partOfDay} from "../../env";
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import React from "react";

function FilterActivity(activity, filters) {
    return activity.price <= filters[FilterName.PriceUnder]
        && (filters[FilterName.AllWeek] || activity.daysOfWeek[dayOfWeek])
        && (filters[FilterName.AllDay]  || activity.timesOfDay[partOfDay])
        && (filters[FilterName.AllSeasons]  || activity.seasons[currentSeason])
}

export default function FilteredActivityList({ activities, filters, navigation }) {

    activities = activities.filter((activity) => FilterActivity(activity, filters));

    return (
        <>
            <Text>price:{filters[FilterName.PriceUnder]}</Text>
            {activities.map((activity, i) => <ActivityListItem index={i} activity={activity} navigation={navigation} />)}
        </>
    );
}
