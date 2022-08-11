import React from "react";
import {ScrollView, Platform, Dimensions} from "react-native";
import { Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/Octicons";
import { FilterName, defaultFilterState, styles, dayOfWeek, MIN_PRICE, partOfDay } from "../../env";
import Filter from "./Filter";
import ExtraFilters from "./ExtraFilters";


export default class FiltersBar extends React.Component {
    headerHeight;
    static ThisSeason = 'ThisSeason';
    static ThisDay    = 'ThisDay';
    showTimeOfDayFilter = false;

    constructor(props) {
        super(props);

        this.props = props;
        this.headerHeight = props.headerHeight ? props.headerHeight : 140;
        this.showTimeOfDayFilter = Dimensions.get('window').width > 675;
        this.state = { extraFiltersVisible: false, availableNow: false };

        this.togglePrice = this.togglePrice.bind(this);
        this.saveExtra = this.saveExtra.bind(this);
        this.update = this.update.bind(this);
        this.toggleAvailableNow = this.toggleAvailableNow.bind(this);
    }

    update(changes, updateAvailableNow = true) {
        let newFilterState = { ...this.props.filters, ...changes };
        this.props.onChange(newFilterState);

        if (updateAvailableNow) {
            const FN = FilterName;
            if (!newFilterState[FN.AllSeasons] && !newFilterState[FN.AllWeek] && !newFilterState[FN.AllDay]) {
                this.setState({availableNow: true});
            } else {
                this.setState({availableNow: false});
            }
        }
    }

    saveExtra(newState) {
        this.setState({ extraFiltersVisible: false });
        this.update(newState);
    }

    togglePrice() {
        let priceUnder = this.props.filters[FilterName.PriceUnder] > MIN_PRICE
            ? MIN_PRICE
            : defaultFilterState[FilterName.PriceUnder];

        this.props.onChange({ ...this.props.filters, [FilterName.PriceUnder]: priceUnder });
    }

    toggleAvailableNow() {
        const FN  = FilterName;

        if (this.state.availableNow) {
            this.setState({ availableNow: false });
            this.update({ [FN.AllSeasons]: true, [FN.AllWeek]: true, [FN.AllDay]: true }, false);
        } else {
            this.setState({ availableNow: true });
            this.update({ [FN.AllSeasons]: false, [FN.AllWeek]: false, [FN.AllDay]: false }, false);
        }
    }

    render() {
        const day = dayOfWeek;
        const FN  = FilterName;

        return (
            <>
                <ScrollView horizontal={true} style={styles.filtersContainer}>
                    {Platform.OS !== "web" &&
                        <Button
                            buttonStyle={styles.filterButton}
                            icon={<Icon
                                name='settings'
                                size={17}
                                style={{transform: [{rotate: '90deg'}]}}
                            />}
                            onPress={() => {this.setState({extraFiltersVisible: true})}}
                        />
                    }
                    <Filter title="Available Now" onChange={this.toggleAvailableNow} checked={this.state.availableNow}/>
                    <Filter title="This Season" onChange={() => {this.update({[FN.AllSeasons]: !this.props.filters[FN.AllSeasons]})}} checked={!this.props.filters[FN.AllSeasons]}/>
                    <Filter title={"On " + day} onChange={() => {this.update({[FN.AllWeek]: !this.props.filters[FN.AllWeek]})}} checked={!this.props.filters[FN.AllWeek]}/>
                    {this.showTimeOfDayFilter &&
                    <Filter title={partOfDay + "s"} onChange={() => {
                        this.update({[FN.AllDay]: !this.props.filters[FN.AllDay]})
                    }} checked={!this.props.filters[FN.AllDay]}/>
                    }
                    <Filter title="Economy $" onChange={this.togglePrice} checked={this.props.filters[FN.PriceUnder] <= MIN_PRICE}/>
                    {Platform.OS !== "web" &&
                    <Button
                        title='More Filters'
                        type='clear'
                        onPress={() => {this.setState({extraFiltersVisible: true})}}
                    />
                    }
                </ScrollView>

                {Platform.OS !== "web" &&
                    <ExtraFilters
                        visible={this.state.extraFiltersVisible}
                        headerHeight={this.headerHeight}
                        closeTrigger={() => {
                            this.setState({extraFiltersVisible: false})
                        }}
                        priceIsMin={this.props.filters[FN.PriceUnder] <= MIN_PRICE}
                        allDay={this.props.filters[FN.AllDay] ? 1 : 0}
                        allWeek={this.props.filters[FN.AllWeek] ? 1 : 0}
                        allSeasons={this.props.filters[FN.AllSeasons] ? 1 : 0}
                        onSave={this.saveExtra}
                    />
                }
            </>
        );
    }
}
