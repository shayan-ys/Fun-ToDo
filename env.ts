import { StyleSheet } from 'react-native';
import {getPartOfDay, getSeason} from "./helper";

export enum Screens {
    ActivityList    = "ActivityList",
    ActivityDetails = "ActivityDetails",
}

export enum Tabs {
    About = "About",
    Home  = "Home",
}

const checkBoxChecked = {
    backgroundColor: '#E3F2FD',
    borderColor: '#82B1FF',
    marginTop: 9,
    borderWidth: 1,
    borderRadius: 30,
};
const checkBoxCheckedText = {
    color: '#1976D2',
    fontSize: 15,
};
const checkBoxUnchecked = {
    backgroundColor: '#FFFFFF',
    borderColor: '#BDBDBD',
    marginTop: 9,
    borderWidth: 1,
    borderRadius: 30
};
const checkBoxUncheckedText = {
    color: '#757575',
    fontSize: 15,
};

const buttonAsCheckBox = {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 0,
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
    filterButton: {...checkBoxUnchecked, borderWidth: 1, paddingTop: 9, paddingRight: 10, paddingLeft: 10, marginTop: 0},

    buttonChecked: {...checkBoxChecked, ...buttonAsCheckBox},
    buttonCheckedText: {...checkBoxCheckedText, ...buttonAsCheckBoxText},
    buttonUnchecked: {...checkBoxUnchecked, ...buttonAsCheckBox},
    buttonUncheckedText: {...checkBoxUncheckedText, ...buttonAsCheckBoxText},

    aboutImage: {
        marginBottom: 5,
    },
    aboutLabel: {
        marginTop: 47,
        color: '#757575',
    },
    aboutTitle: {
        fontSize: 19,
        fontWeight: 'bold',
    }
});

export enum FilterName {
    AvailableNow = 'AvailableNow',
    PriceUnder   = 'PriceUnder',
    AllSeasons   = 'AllSeasons',
    AllWeek      = 'AllWeek',
    AllDay       = 'AllDay',
}

export const MIN_TITLE_LEN = 3;

export const MIN_PRICE = 1;
export const DEFAULT_PRICE = 2;
export const MAX_PRICE = 4;

export const defaultFilterState = {
    // [FilterName.AvailableNow as string]: false,
    [FilterName.PriceUnder   as string]: MAX_PRICE,
    [FilterName.AllSeasons   as string]: true,
    [FilterName.AllWeek      as string]: true,
    [FilterName.AllDay       as string]: true,
};

const date = new Date();
export const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][ date.getDay() ];
export const partOfDay = getPartOfDay(date.getHours());
export const currentSeason = getSeason(date.getMonth() + 1);
