import React from 'react';
import {SafeAreaView, Text, View} from "react-native";
import Storage from "../../storage/Storage";
import { Button } from 'react-native-elements';
import FiltersBar from "../Filter/FiltersBar";
import { defaultFilterState } from "../../env";
import { useHeaderHeight, Header } from "@react-navigation/stack";
import FilteredActivityList from "./FilteredActivityList";

export default function ActivityList({ navigation }) {
    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            Storage.getAll().then((storage) => {
                setActivities(Object.values(storage));
            });
        });
    }, [navigation]);

    const [activities, setActivities] = React.useState([]);
    const [filters, setFilters] = React.useState({...defaultFilterState});

    // status bar height
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
                <FiltersBar filters={filters} onChange={setFilters} headerHeight={headerHeight} />
            </SafeAreaView>

            {/*Activities*/}
            <View style={{ marginTop: 35 }}>
                <FilteredActivityList activities={activities} filters={filters} navigation={navigation} resetFilter={() => {setFilters({...defaultFilterState})}} />
            </View>

            {/*Add Button*/}
            <Text style={{ marginTop: 35 }}></Text>
            <Button
                icon={{ name: 'add', color: 'white' }}
                raised
                title="Add"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('ActivityDetails');
                }}
            />
        </View>
    );
}
