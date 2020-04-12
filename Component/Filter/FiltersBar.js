import {FilterName, defaultFilterState, MAX_PRICE, styles} from "../../env";
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/Octicons";
import Filter from "./Filter";
import {ScrollView, Text, View} from "react-native";
import React from "react";

export default function FiltersBar({ onChange }) {
    let state = {...defaultFilterState};

    const updated = (key, newValue) => {
        state[key] = newValue;
        onChange(state);
    };

    const priceUnderDefault = (newValue) => {
        state[FilterName.PriceUnder] = newValue ? defaultFilterState[FilterName.PriceUnder] : MAX_PRICE;
        onChange(state);
    };

    const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][ (new Date()).getDay() ];

    return (
        <ScrollView horizontal={true} style={styles.filtersContainer}>
            {/*<Text>blah blah</Text>*/}
            <Button
                buttonStyle={styles.filterButton}
                icon={<Icon
                    name='settings'
                    size={17}
                    style={{transform: [{ rotate: '90deg' }]}}
                />}
            />
            <Filter title="Available Now" defaultValue={defaultFilterState[FilterName.AvailableNow]} onChange={updated.bind(null, FilterName.AvailableNow)} />
            <Filter title="This Season"   defaultValue={defaultFilterState[FilterName.ThisSeason]}   onChange={updated.bind(null, FilterName.ThisSeason)} />
            <Filter title={"On " + day}   defaultValue={defaultFilterState[FilterName.ThisDay]}      onChange={updated.bind(null, FilterName.ThisDay)} />
            <Filter title="Under $$"      defaultValue={defaultFilterState[FilterName.PriceUnder]}   onChange={priceUnderDefault} />
        </ScrollView>
    );
}
