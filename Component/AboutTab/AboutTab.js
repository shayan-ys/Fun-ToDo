import React, { useCallback } from "react";
import { Image, SafeAreaView, ScrollView, Text, Dimensions, View, Linking, TouchableOpacity } from "react-native";
import { SocialIcon } from "react-native-elements";
import { styles } from '../../env';

export default function AboutTab() {
    const screenWidth = Dimensions.get('window').width;
    const aboutImgWidth = Math.min(screenWidth / 4, 150);

    const OpenURLButton = ({ url, children, style = {} }) => {
        const handlePress = useCallback(async () => {
            await Linking.openURL(url);
        }, [url]);

        return <TouchableOpacity style={style} onPress={handlePress}>{children}</TouchableOpacity>;
    };

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column'}}>
            <ScrollView style={{ paddingTop: 50, paddingBottom: 30 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={[styles.aboutImage, {
                            width: aboutImgWidth,
                            height: aboutImgWidth,
                            borderRadius: aboutImgWidth /2,
                            borderWidth: 4,
                            borderColor: '#06A763',
                        }]}
                        source={require('./profile.jpg')}
                    />
                    <Text style={styles.aboutLabel}>NAME</Text>
                    <Text style={styles.aboutTitle}>Shayan Ys</Text>
                    <Text style={styles.aboutLabel}>WEBSITE</Text>
                    <OpenURLButton
                        url='https://shayanys.com'
                        style={[styles.aboutURLButton, {backgroundColor: '#06A763', paddingTop: 7}]}
                    >
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                        }}>shayanys.com</Text>
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
                    <OpenURLButton
                        url='https://github.com/shayan-ys/Fun-ToDo'
                        style={[styles.aboutURLButton, {backgroundColor: '#212121', paddingTop: 2, paddingRight: 15}]}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <SocialIcon type='github' style={{ width: 21, height: 21 }} />
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 18,
                            }}>GitHub</Text>
                        </View>
                    </OpenURLButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
