import { StyleSheet } from 'react-native';

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
        padding: 7
    },
    filterButton: {...checkBoxUnchecked, borderWidth: 1, paddingTop: 9, paddingRight: 10, paddingLeft: 10},

    buttonChecked: {...checkBoxChecked, ...buttonAsCheckBox},
    buttonCheckedText: {...checkBoxCheckedText, ...buttonAsCheckBoxText},
    buttonUnchecked: {...checkBoxUnchecked, ...buttonAsCheckBox},
    buttonUncheckedText: {...checkBoxUncheckedText, ...buttonAsCheckBoxText},
});
