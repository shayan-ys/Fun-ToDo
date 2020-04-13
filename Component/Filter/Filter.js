import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-elements';
import { styles } from "../../env";

export default function Filter({ title, checked, onChange }) {
    return (
        <View style={{ marginLeft: 10 }}>
            <Button
                buttonStyle={checked ? styles.buttonChecked : styles.buttonUnchecked}
                titleStyle={checked ? styles.buttonCheckedText : styles.buttonUncheckedText}
                title={title}
                onPress={onChange}
            />
        </View>
    );
}
