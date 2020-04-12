import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-elements';
import {defaultFilterState, FilterName, styles} from "../../env";

export default function Filter({ display, name, onChange }) {
    const [checked, setChecked] = React.useState(defaultFilterState[name]);

    const updated = (newValue) => {
        setChecked(newValue);
        onChange.bind(null, name)(newValue);
    };

    return (
        <View style={{ marginLeft: 10 }}>
            <Button
                buttonStyle={checked ? styles.buttonChecked : styles.buttonUnchecked}
                titleStyle={checked ? styles.buttonCheckedText : styles.buttonUncheckedText}
                title={display}
                onPress={() => updated(!checked)}
            />
        </View>
    );
}
