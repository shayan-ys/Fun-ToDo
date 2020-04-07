import React from 'react';
import {View, Text, TextInput, AsyncStorage} from "react-native";
import {Button} from "react-native-web";
import Storage from '../../storage/Storage';

class ActivityDetails extends React.Component {
    navigation;

    constructor(props) {
        super(props);

        this.state = {title: '', id: null};

        try {
            let item = props.route.params.item;
            if (item) {
                this.state = item;
            }
        } catch (e) {}

        this.navigation = props.route.params.navigation;

        this.save = this.save.bind(this);
    }

    save() {
        if (this.state.id === null) {
            Storage.add(this.state).then(() => {
                this.navigation.popToTop();
            });
        } else {
            Storage.update(this.state).then(() => {
                this.navigation.popToTop();
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Activity Details</Text>
                <Text>Id: {this.state.id}</Text>
                <Text>Title: {this.state.title}</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Title"
                    onChangeText={text => this.setState({title: text})}
                    defaultValue={this.state.title}
                />
                <Button title="Save" onPress={this.save} />
            </View>
        );
    }
}

export default ActivityDetails;
