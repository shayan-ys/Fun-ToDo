import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-elements';
import {styles} from "../../env";

export default function Filter({ title, defaultValue = false, onChange }) {
    const [checked, setChecked] = React.useState(defaultValue);

    const updated = (newValue) => {
        setChecked(newValue);
        onChange(newValue);
    };

    return (
        <View style={{ marginLeft: 10 }}>
            <Button
                buttonStyle={checked ? styles.buttonChecked : styles.buttonUnchecked}
                titleStyle={checked ? styles.buttonCheckedText : styles.buttonUncheckedText}
                title={title}
                onPress={() => updated(!checked)}
            />
        </View>
    );
}
