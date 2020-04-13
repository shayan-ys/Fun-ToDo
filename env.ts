import { StyleSheet } from 'react-native';
import {getPartOfDay} from "./helper";

export enum Screens {
    ActivityList    = "ActivityList",
    ActivityDetails = "ActivityDetails",
}

const checkBoxChecked = {
    backgroundColor: '#E3F2FD',
    borderColor: '#82B1FF',
    borderRadius: 30
};
const checkBoxCheckedText = {
    color: '#1976D2'
};
const checkBoxUnchecked = {
    backgroundColor: '#FFFFFF',
    borderColor: '#BDBDBD',
    borderRadius: 30
};
const checkBoxUncheckedText = {
    color: '#757575'
};

const buttonAsCheckBox = {
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
};
const buttonAsCheckBoxText = {
    fontSize: 14,
};

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 20,
        paddingBottom: 35
    },
    formLabel: {
        paddingLeft: 10,
        marginTop: 23,
        color: 'rgb(134, 147, 158)',
        fontSize: 16,
        fontWeight: 'bold'
    },

    checkBoxChecked: checkBoxChecked,
    checkBoxCheckedText: checkBoxCheckedText,
    checkBoxUnchecked: checkBoxUnchecked,
    checkBoxUncheckedText: checkBoxUncheckedText,

    filtersContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingRight: 7,
        paddingLeft: 7,
        paddingTop: 10,
        paddingBottom: 12,
    },
    filterButton: {...checkBoxUnchecked, borderWidth: 1, paddingTop: 9, paddingRight: 10, paddingLeft: 10},

    buttonChecked: {...checkBoxChecked, ...buttonAsCheckBox},
    buttonCheckedText: {...checkBoxCheckedText, ...buttonAsCheckBoxText},
    buttonUnchecked: {...checkBoxUnchecked, ...buttonAsCheckBox},
    buttonUncheckedText: {...checkBoxUncheckedText, ...buttonAsCheckBoxText},
});

export enum FilterName {
    AvailableNow = 'AvailableNow',
    PriceUnder   = 'PriceUnder',
    AllSeasons   = 'AllSeasons',
    AllWeek      = 'AllWeek',
    AllDay       = 'AllDay',
}

export const MIN_PRICE = 1;
export const DEFAULT_PRICE = 2;
export const MAX_PRICE = 4;

export const defaultFilterState = {
    [FilterName.AvailableNow as string]: false,
    [FilterName.PriceUnder   as string]: DEFAULT_PRICE,
    [FilterName.AllSeasons   as string]: false,
    [FilterName.AllWeek      as string]: true,
    [FilterName.AllDay       as string]: true,
};

export const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][ (new Date()).getDay() ];
export const hourOfDay = (new Date()).getHours();
export const partOfDay = getPartOfDay(hourOfDay);
