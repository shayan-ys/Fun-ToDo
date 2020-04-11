import React from 'react';
import ActivityListItem from "../ActivityListItem/ActivityListItem";
import {Text, View} from "react-native";
import Storage from "../../storage/Storage";
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Octicons';
import Filter from "../Filter/Filter";
import {styles} from "../../env";

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
            {/*Filters*/}
            <View style={styles.filtersContainer}>
                <Button
                    buttonStyle={styles.filterButton}
                    icon={<Icon
                        name='settings'
                        size={17}
                        style={{transform: [{ rotate: '90deg' }]}}
                    />}
                />
                <Filter title="Available Now" defaultValue={false} />
            </View>

            {/*Activities*/}
            <View style={{ marginTop: 35 }}>
            {list.map((activity, i) => <ActivityListItem activity={activity} navigation={navigation} key={i} />)}
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
