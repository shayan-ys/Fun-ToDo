import React from "react";
import {Dimensions, SafeAreaView, ScrollView, View} from "react-native";
import {Button, ButtonGroup, Overlay, Text} from "react-native-elements";
import {currentSeason, dayOfWeek, defaultFilterState, FilterName, MIN_PRICE, partOfDay, styles} from "../../env";

export default class ExtraFilters extends React.Component {
    props;

    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            priceUnder: props.priceIsMin ? MIN_PRICE : defaultFilterState[FilterName.PriceUnder],
            allSeasons: props.allSeasons,
            allWeek:    props.allWeek,
            allDay:     props.allDay,
        };
        this.closeModal = this.closeModal.bind(this);
        this.applyModal = this.applyModal.bind(this);
    }

    closeModal() {
        this.setState({
            priceUnder: this.props.priceIsMin ? MIN_PRICE : defaultFilterState[FilterName.PriceUnder],
            allSeasons: this.props.allSeasons,
            allWeek:    this.props.allWeek,
            allDay:     this.props.allDay,
        });
        this.props.closeTrigger();
    }

    applyModal() {
        this.props.onSave({
            [FilterName.PriceUnder]: this.state.priceUnder,
            [FilterName.AllSeasons]: this.state.allSeasons,
            [FilterName.AllWeek]   : this.state.allWeek,
            [FilterName.AllDay]    : this.state.allDay,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.priceIsMin !== this.props.priceIsMin) {
            this.setState({ priceUnder: this.props.priceIsMin ? MIN_PRICE : defaultFilterState[FilterName.PriceUnder] });
        }
        if (prevProps.allSeasons !== this.props.allSeasons) {
            this.setState({ allSeasons: this.props.allSeasons });
        }
        if (prevProps.allWeek !== this.props.allWeek) {
            this.setState({ allWeek: this.props.allWeek });
        }
        if (prevProps.allDay !== this.props.allDay) {
            this.setState({ allDay: this.props.allDay });
        }
    }

    render() {
        return (
            <Overlay
                isVisible={this.props.visible}
                fullScreen={false}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height - this.props.headerHeight - 20}
                animationType='slide'
                statusBarTranslucent={false}
                windowBackgroundColor='rgba(0,0,0,0.2)'
                transparent={true}
            >
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Button
                            icon={{
                                name: "close",
                                size: 27,
                                color: "black"
                            }}
                            buttonStyle={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: '50%',
                                paddingTop: 8,
                                paddingRight: 3,
                                paddingBottom: 8,
                                paddingLeft: 3
                            }}
                            onPress={this.closeModal}
                        />
                    </View>
                    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
                        <ScrollView>
                            <Text style={{fontSize: 22, fontWeight: 'bold', alignSelf: 'center'}}>Filters</Text>

                            {/*Price under*/}
                            <Text style={styles.formLabel}>Price Under</Text>
                            <ButtonGroup
                                buttons={['$', '$$', '$$$', '$$$$']}
                                selectedIndex={this.state.priceUnder - 1}
                                onPress={index => {
                                    this.setState({priceUnder: index + 1})
                                }}
                            />

                            {/*This Season*/}
                            <Text style={styles.formLabel}>Season</Text>
                            <ButtonGroup
                                buttons={['Only ' + currentSeason + 's', 'Any Season']}
                                selectedIndex={this.state.allSeasons}
                                onPress={index => {this.setState({allSeasons: index})}}
                            />

                            {/*This Day*/}
                            <Text style={styles.formLabel}>Day of Week</Text>
                            <ButtonGroup
                                buttons={['On ' + dayOfWeek + 's', 'Any Day of Week']}
                                selectedIndex={this.state.allWeek}
                                onPress={index => {this.setState({allWeek: index})}}
                            />

                            {/*This Day*/}
                            <Text style={styles.formLabel}>Day of Week</Text>
                            <ButtonGroup
                                buttons={[partOfDay + 's', 'Any Time of Day']}
                                selectedIndex={this.state.allDay}
                                onPress={index => {this.setState({allDay: index})}}
                            />
                        </ScrollView>
                    </SafeAreaView>

                    {/*Actions*/}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, paddingRight: 3 }}>
                            <Button
                                title='Cancel'
                                type="outline"
                                buttonStyle={{ borderColor: '#F44336' }}
                                titleStyle={{ color: '#F44336' }}
                                onPress={this.closeModal}
                            />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 3 }}>
                            <Button
                                title='Apply'
                                onPress={this.applyModal}
                            />
                        </View>
                    </View>
                </View>
            </Overlay>
        );
    }
}
