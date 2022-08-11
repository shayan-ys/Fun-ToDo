import React from 'react';
import { Text, SafeAreaView, ScrollView, View, Alert, Platform } from "react-native";
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { MIN_TITLE_LEN, styles } from "../../env";
import Storage from '../../storage/Storage';
import Activity from "../../Models/Activity.ts";
import Season from "../../Models/Season";
import TimeOfDay  from "../../Models/TimeOfDay";
import DayOfWeek from "../../Models/DayOfWeek";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

class ActivityDetails extends React.Component {
    navigation;
    scroll;

    constructor(props) {
        super(props);

        let activity;
        try {
            activity = JSON.parse(props.route.params.activity);
        } catch (e) {}
        activity = activity || new Activity();

        let seasons = {};
        let times = {};
        let days = {};
        Season.list.map((season)  => { seasons[season] = activity.seasons[season]  });
        TimeOfDay.list.map((time) => { times[time]     = activity.timesOfDay[time] });
        DayOfWeek.list.map((day)  => { days[day]       = activity.daysOfWeek[day]  });

        this.state = {
            ...seasons,
            ...times,
            ...days,
            activity: activity,
            loading: false,
            deleteLoading: false,
            titleError: false,
        };

        this.navigation = props.navigation;

        this.save = this.save.bind(this);
        this.setActivity = this.setActivity.bind(this);
        this.validateTitle = this.validateTitle.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    setActivity(change, callback = (activity, key, newValue) => {}) {
        let activity = this.state.activity;

        for (const key of Object.keys(change)) {
            activity[key] = change[key];
            callback(activity, key, change[key]);
        }

        this.setState({ activity: activity });
    }

    updateActivityPreSave() {
        let activity = this.state.activity;

        Season.list.map((season)  => {activity.seasons[season]  = this.state[season]});
        TimeOfDay.list.map((time) => {activity.timesOfDay[time] = this.state[time]});
        DayOfWeek.list.map((day)  => {activity.daysOfWeek[day]  = this.state[day]});

        this.setState({ activity: activity });
    }

    save() {
        if (!this.validateTitle()) {
            this.scroll.scrollTo({x: 0, y: 0, animated: true});
            return;
        }

        this.setState({ loading: true });

        this.updateActivityPreSave();

        if (this.state.activity.id === null) {
            Storage.add(this.state.activity)
                .then(() => {
                    this.setState({ loading: false });
                    this.navigation.popToTop();
                })
                .catch((reason => {console.error(reason)}));

        } else {
            Storage.update(this.state.activity)
                .then(() => {
                    this.setState({ loading: false });
                    this.navigation.popToTop();
                })
                .catch((reason => {console.error(reason)}));
        }
    }

    delete() {
        if (this.state.activity.id !== null) {
            this.setState({deleteLoading: true});

            Storage.delete(this.state.activity.id)
                .then(() => {
                    this.setState(({ deleteLoading: false }));
                    this.navigation.popToTop();
                })
                .catch(reason => {console.error(reason)});
        }
    }

    validateTitle() {
        if (this.state.activity.title.length < MIN_TITLE_LEN) {
            this.setState({ titleError: true });
            return false;
        } else {
            this.setState({ titleError: false });
            // Todo: analyze title for icon
            return true;
        }
    }

    confirmDeleteMobile = () =>
        Alert.alert(
            "Are you sure?",
            `Deleting "${this.state.activity.title}" activity`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "Delete", onPress: () => {this.delete()} }
            ],
            { cancelable: false }
        );

    confirmDeleteWeb() {
        if (confirm("Are you sure?")) {
            this.delete();
        }
    }

    confirmDelete = Platform.OS === "web" ? this.confirmDeleteWeb : this.confirmDeleteMobile

    makeCheckBox(value, index) {
        return <Button
            key={index}
            type='outline'
            buttonStyle={this.state[value] ? styles.checkBoxChecked     : styles.checkBoxUnchecked     }
            titleStyle={this.state[value] ? styles.checkBoxCheckedText : styles.checkBoxUncheckedText }
            title={value}
            center={true}
            onPress={() => {
                this.setState({ [value]: !this.state[value] })
            }}
        />
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView} ref={(c) => {this.scroll = c}}>

                    {/*title*/}
                    <Text style={styles.formLabel}>Activity Name</Text>
                    <Input
                        autoFocus={ this.state.activity.id === null }
                        placeholder="Dining at McDonald's"
                        onBlur={this.validateTitle}
                        onFocus={() => {this.setState({ titleError: false })}}
                        onChangeText={text => this.setActivity({ title: text })}
                        defaultValue={ this.state.activity.title }
                        errorStyle={this.state.titleError ? { color: 'red' } : { display: 'none' }}
                        errorMessage='Title is required and should be 3 letters at least'
                    />

                    {/*price*/}
                    <Text style={styles.formLabel}>Price</Text>
                    <ButtonGroup
                        onPress={index => this.setActivity({ price: index + 1 })}
                        selectedIndex={ this.state.activity.price - 1 }
                        buttons={['$', '$$', '$$$', '$$$$']}
                    />

                    {/*seasons*/}
                    <Text style={styles.formLabel}>Available in seasons</Text>
                    {Season.list.map((value, i) => this.makeCheckBox(value, i))}

                    {/*time of day*/}
                    <Text style={styles.formLabel}>Best times to plan</Text>
                    {TimeOfDay.list.map((value, i) => this.makeCheckBox(value, i))}

                    {/*days of week*/}
                    <Text style={styles.formLabel}>Days to go</Text>
                    {DayOfWeek.list.map((value, i) => this.makeCheckBox(value, i))}

                    {/*notes*/}
                    <Text style={styles.formLabel}>Additional Notes</Text>
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => this.setActivity({ note: text })}
                        defaultValue={ this.state.activity.note }
                    />

                    <View style={{ marginTop: 9, paddingBottom: 20 }}>
                        {this.state.activity.id !== null &&
                            <View>
                                <Button
                                    title="Delete"
                                    type='outline'
                                    loading={this.state.deleteLoading}
                                    icon={<FontAwesome5Icon name='trash-alt' size={16} style={{color: '#B00020'}}/>}
                                    buttonStyle={{borderColor: '#B00020', marginTop: 35}}
                                    titleStyle={{color: '#B00020', marginLeft: 5, fontSize: 16}}
                                    onPress={this.confirmDelete}
                                />
                            </View>
                        }
                        <View style={{ marginTop: 13 }}>
                            <Button
                                title="Save"
                                raised
                                titleStyle={{ fontWeight: 'bold', fontSize: 19 }}
                                loading={this.state.loading}
                                onPress={this.save}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default ActivityDetails;
