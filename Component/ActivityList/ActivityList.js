import React from 'react';
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import {Text, View} from "react-native";
import Storage from "../../storage/Storage";
import { Button } from 'react-native-elements';

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
        <View>
            {list.map((activity, i) => <ActivityListItem activity={activity} navigation={navigation} key={i} />)}
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
