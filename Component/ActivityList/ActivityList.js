import React from 'react';
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import { FlatList } from "react-native";
import Storage from "../../storage/Storage";

export default function ActivityList({ navigation }) {
    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            Storage.getAll().then((storage) => {
                setList(Object.values(storage));
            });
        });
    }, [navigation]);

    const [list, setList] = React.useState([]);

    return (
        <FlatList
            data={list}
            renderItem={({item}) => <ActivityListItem item={item} navigation={navigation} />}
        />
    );
}
