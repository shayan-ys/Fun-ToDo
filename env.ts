import { StyleSheet } from 'react-native';

export enum Screens {
    ActivityList    = "ActivityList",
    ActivityDetails = "ActivityDetails",
}

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
    checkBoxChecked: {
        backgroundColor: '#E3F2FD',
        borderColor: '#82B1FF',
        borderRadius: 30
    },
    checkBoxCheckedText: {
        color: '#1976D2'
    },
    checkBoxUnchecked: {
        borderRadius: 30
    },
    checkBoxUncheckedText: {
        color: '#757575'
    },
});
