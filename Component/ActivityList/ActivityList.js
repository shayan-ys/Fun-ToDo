import React from 'react';
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import {Text, View} from "react-native";
import Storage from "../../storage/Storage";
import {Button} from 'react-native-elements';
import FiltersBar from "../Filter/FiltersBar";
import {defaultFilterState} from "../../env";

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

    return (
        <View>
            {/*Filters*/}
            <FiltersBar onChange={setFilterMiddle} />

            {/*Activities*/}
            <View style={{ marginTop: 35 }}>
            {activities.map((activity, i) => <ActivityListItem activity={activity} navigation={navigation} key={i} />)}
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
