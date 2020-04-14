import React from "react";
import { ScrollView } from "react-native";
import { Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/Octicons";
import { FilterName, defaultFilterState, styles, dayOfWeek, MIN_PRICE } from "../../env";
import Filter from "./Filter";
import ExtraFilters from "./ExtraFilters";


export default class FiltersBar extends React.Component {
    headerHeight;
    static ThisSeason = 'ThisSeason';
    static ThisDay    = 'ThisDay';

    constructor(props) {
        super(props);

        this.props = props;
        this.headerHeight = props.headerHeight ? props.headerHeight : 140;
        this.state = { extraFiltersVisible: false };

        this.togglePrice = this.togglePrice.bind(this);
        this.saveExtra = this.saveExtra.bind(this);
        this.update = this.update.bind(this);
    }

    update(changes) {
        this.props.onChange({ ...this.props.filters, ...changes });
    }

    saveExtra(newState) {
        this.setState({ extraFiltersVisible: false });
        this.props.onChange({ ...this.props.filters, ...newState });
    }

    togglePrice() {
        let priceUnder = this.props.filters[FilterName.PriceUnder] > MIN_PRICE
            ? MIN_PRICE
            : defaultFilterState[FilterName.PriceUnder];

        this.props.onChange({ ...this.props.filters, [FilterName.PriceUnder]: priceUnder });
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
                        onPress={() => { this.setState({ extraFiltersVisible: true }) }}
                    />
                    <Filter title="This Season" onChange={() => {this.update({[FN.AllSeasons]: !this.props.filters[FN.AllSeasons]})}} checked={!this.props.filters[FN.AllSeasons]}/>
                    <Filter title={"On " + day} onChange={() => {this.update({[FN.AllWeek]: !this.props.filters[FN.AllWeek]})}} checked={!this.props.filters[FN.AllWeek]}/>
                    <Filter title="Economy $"   onChange={this.togglePrice} checked={this.props.filters[FN.PriceUnder] <= MIN_PRICE}/>
                    <Button
                        title='More Filters'
                        type='clear'
                        onPress={() => {this.setState({ extraFiltersVisible: true })}}
                    />
                </ScrollView>

                <ExtraFilters
                    visible     ={this.state.extraFiltersVisible}
                    headerHeight={this.headerHeight}
                    closeTrigger={() => {this.setState({ extraFiltersVisible: false })}}
                    priceIsMin  ={this.props.filters[FN.PriceUnder] <= MIN_PRICE}
                    allDay      ={this.props.filters[FN.AllDay]     ? 1 : 0}
                    allWeek     ={this.props.filters[FN.AllWeek]    ? 1 : 0}
                    allSeasons  ={this.props.filters[FN.AllSeasons] ? 1 : 0}
                    onSave      ={this.saveExtra}
                />
            </>
        );
    }
}
