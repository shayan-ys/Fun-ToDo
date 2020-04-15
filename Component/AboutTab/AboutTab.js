import React, { useCallback } from "react";
import { Image, SafeAreaView, ScrollView, Text, Dimensions, View, Linking, TouchableOpacity } from "react-native";
import { SocialIcon, Button } from "react-native-elements";
import { styles } from '../../env';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function AboutTab() {
    const screenWidth = Dimensions.get('window').width;

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            await Linking.openURL(url);
        }, [url]);

        return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
    };

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column'}}>
            <ScrollView style={{ paddingTop: 50 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={[styles.aboutImage, {
                            width: screenWidth / 4,
                            height: screenWidth / 4,
                            borderRadius: screenWidth / 8,
                            borderWidth: 4,
                            borderColor: '#06a763',
                        }]}
                        source={require('./profile.jpg')}
                    />
                    <Text style={styles.aboutLabel}>NAME</Text>
                    <Text style={styles.aboutTitle}>Shayan Ys</Text>
                    <Text style={styles.aboutLabel}>WEBSITE</Text>
                    <OpenURLButton url='https://shayanys.com'>
                        <Button
                            type='solid'
                            title='shayanys.com'
                            titleStyle={{ color: 'white' }}
                            buttonStyle={{ backgroundColor: '#06a763', marginTop: 5, width: 150, height: 50 }}
                        />
                    </OpenURLButton>
                    <Text style={styles.aboutLabel}>FOLLOW ME ON</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <OpenURLButton url='https://instagram.com/shayanys.art'>
                            <SocialIcon type='instagram' light />
                        </OpenURLButton>
                        <OpenURLButton url='https://github.com/shayan-ys'>
                            <SocialIcon type='github' light />
                        </OpenURLButton>
                        <OpenURLButton url='https://www.linkedin.com/in/shayanys/'>
                            <SocialIcon type='linkedin' light />
                        </OpenURLButton>
                        <OpenURLButton url='http://twitter.com/shayanyousefian'>
                            <SocialIcon type='twitter' light />
                        </OpenURLButton>
                    </View>
                    <Text style={styles.aboutLabel}>CONTRIBUTE TO THE PROJECT</Text>
                    <OpenURLButton url='https://github.com/shayan-ys/Fun-ToDo'>
                        <Button
                            type='solid'
                            title='GitHub'
                            icon={<SocialIcon type='github' style={{ width: 21, height: 21 }} />}
                            titleStyle={{ color: 'white' }}
                            buttonStyle={{ backgroundColor: '#212121', marginTop: 13, width: 150, height: 50, paddingTop: 5, paddingRight: 13 }}
                        />
                    </OpenURLButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
