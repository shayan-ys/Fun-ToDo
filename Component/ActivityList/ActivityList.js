import React from 'react';
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import Storage from "../../storage/Storage";
import {Button} from 'react-native-elements';
import FiltersBar from "../Filter/FiltersBar";
import {defaultFilterState} from "../../env";
import { useHeaderHeight, Header } from "@react-navigation/stack";

export default function ActivityList({ navigation }) {
    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            Storage.getAll().then((storage) => {
                setActivities(Object.values(storage));
            });
        });
    }, [navigation]);

    const [activities, setActivities] = React.useState([]);
    const [filters, setFilters] = React.useState(defaultFilterState);
    const setFilterMiddle = (newValue) => {
        setFilters(newValue);
        // console.log(filters);
    };

    let headerHeight;
    try {
        headerHeight = parseInt(useHeaderHeight().toString());
    } catch (e) {}
    if (!headerHeight) {
        try {
            headerHeight = Header.HEIGHT;
        } catch (e) {}
    }

    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
            {/*Filters*/}
            <SafeAreaView style={{height: 63}}>
                <FiltersBar onChange={setFilterMiddle} headerHeight={headerHeight} />
            </SafeAreaView>

            {/*Activities*/}
            <View style={{ marginTop: 35 }}>
                {activities.map((activity, i) => <ActivityListItem index={i} activity={activity} navigation={navigation} />)}
            </View>

            {/*Add Button*/}
            <Text style={{ marginTop: 35 }}></Text>
            <Button
                icon={{ name: 'add', color: 'white' }}
                raised
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
