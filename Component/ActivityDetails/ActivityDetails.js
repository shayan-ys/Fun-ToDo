import React from 'react';
import { Text, SafeAreaView, ScrollView } from "react-native";
import Storage from '../../storage/Storage';
import { Input, Button, ButtonGroup, CheckBox } from 'react-native-elements';
import Activity from "../../Models/Activity.ts";
import { styles } from "../../env";
import Season from "../../Models/Season";
import TimeOfDay  from "../../Models/TimeOfDay";
import DayOfWeek from "../../Models/DayOfWeek";

class ActivityDetails extends React.Component {
    navigation;

    constructor(props) {
        super(props);

        let activity = null;
        try {
            activity = props.route.params.activity;
        } catch (e) {}
        activity = activity || new Activity();

        let seasons = {};
        let times = {};
        let days = {};
        Season.list.map((season)  => { seasons[season] = activity.seasons[season]  });
        TimeOfDay.list.map((time) => { times[time]     = activity.timesOfDay[time] });
        DayOfWeek.list.map((day)  => { days[day]       = activity.daysOfWeek[day]  });

        this.state = {...seasons, ...times, ...days, activity: activity, loading: false};

        this.navigation = props.navigation;

        this.save = this.save.bind(this);
        this.setActivity = this.setActivity.bind(this);
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
        this.setState({ loading: true });

        this.updateActivityPreSave();

        if (this.state.activity.id === null) {
            Storage.add(this.state.activity).then(() => {
                this.setState({ loading: false });
                this.navigation.popToTop();
            });
        } else {
            Storage.update(this.state.activity).then(() => {
                this.setState({ loading: false });
                this.navigation.popToTop();
            });
        }
    }

    makeCheckBox(value) {
        return <CheckBox
            containerStyle={this.state[value] ? styles.checkBoxChecked : styles.checkBoxUnchecked}
            textStyle={this.state[value] ? styles.checkBoxCheckedText : styles.checkBoxUncheckedText}
            checked={this.state[value]}
            title={value}
            center={true}
            checkedIcon=''
            uncheckedIcon=''
            onPress={() => {
                this.setState({ [value]: !this.state[value] })
            }}
        />
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    {/*title*/}
                    <Text style={styles.formLabel}>Activity Name</Text>
                    <Input
                        leftIcon={{ name: 'create' }}
                        placeholder="Dining at McDonald's"
                        onChangeText={text => this.setActivity({ title: text })}
                        defaultValue={ this.state.activity.title }
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
                    {Season.list.map((value) => this.makeCheckBox(value))}

                    {/*time of day*/}
                    <Text style={styles.formLabel}>Best times to plan</Text>
                    {TimeOfDay.list.map((value) => this.makeCheckBox(value))}

                    {/*days of week*/}
                    <Text style={styles.formLabel}>Days to go</Text>
                    {DayOfWeek.list.map((value) => this.makeCheckBox(value))}

                    {/*notes*/}
                    <Text style={styles.formLabel}>Additional Notes</Text>
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={text => this.setActivity({ note: text })}
                        defaultValue={ this.state.activity.note }
                    />

                    <Text style={{ marginTop: 35 }}></Text>
                    <Button
                        title="Save"
                        raised
                        loading={this.state.loading}
                        onPress={this.save}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default ActivityDetails;
