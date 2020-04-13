import React from "react";
import { ScrollView } from "react-native";
import {Button, ButtonGroup, Text} from 'react-native-elements';
import Icon from "react-native-vector-icons/Octicons";
import {FilterName, defaultFilterState, MAX_PRICE, styles, dayOfWeek, MIN_PRICE} from "../../env";
import Filter from "./Filter";
import ExtraFilters from "./ExtraFilters";


export default class FiltersBar extends React.Component {
    onChange;
    headerHeight;
    static ThisSeason = 'ThisSeason';
    static ThisDay    = 'ThisDay';

    constructor(props) {
        super(props);

        this.onChange = props.onChange;
        this.headerHeight = props.headerHeight ? props.headerHeight : 140;
        this.state = {
            ...defaultFilterState,
            extraFiltersVisible: true,
        };

        this.togglePrice = this.togglePrice.bind(this);
        this.saveExtra = this.saveExtra.bind(this);
    }

    saveExtra(newState) {
        this.setState({
            ...this.state,
            ...newState,
            extraFiltersVisible: false,
        });
    }

    togglePrice() {
        this.setState({
            [FilterName.PriceUnder]:
                this.state[FilterName.PriceUnder] > MIN_PRICE
                    ? MIN_PRICE
                    : defaultFilterState[FilterName.PriceUnder]
        })
    }

    render() {
        const day = dayOfWeek;
        const FN  = FilterName;

        return (
            <>
                <ScrollView horizontal={true} style={styles.filtersContainer}>
                    <Button
                        buttonStyle={styles.filterButton}
                        icon={<Icon
                            name='settings'
                            size={17}
                            style={{transform: [{rotate: '90deg'}]}}
                        />}
                        onPress={() => {this.setState({extraFiltersVisible: true})}}
                    />
                    <Filter title="This Season" onChange={() => {this.setState({[FN.AllSeasons]: !this.state[FN.AllSeasons]})}} checked={!this.state[FN.AllSeasons]}/>
                    <Filter title={"On " + day} onChange={() => {this.setState({[FN.AllWeek]: !this.state[FN.AllWeek]})}} checked={!this.state[FN.AllWeek]}/>
                    <Filter title="Economy $"    onChange={this.togglePrice} checked={this.state[FN.PriceUnder] <= MIN_PRICE}/>
                    <Button
                        title='More Filters'
                        type='clear'
                        onPress={() => {this.setState({extraFiltersVisible: true})}}
                    />
                </ScrollView>

                <ExtraFilters
                    visible={this.state.extraFiltersVisible}
                    headerHeight={this.headerHeight}
                    closeTrigger={() => {this.setState({extraFiltersVisible: false})}}
                    priceIsMin={this.state[FN.PriceUnder] <= MIN_PRICE}
                    allDay={this.state[FN.AllDay] ? 1 : 0}
                    allWeek={this.state[FN.AllWeek] ? 1 : 0}
                    allSeasons={this.state[FN.AllSeasons] ? 1 : 0}
                    onSave={this.saveExtra}
                />
            </>
        );
    }
}
