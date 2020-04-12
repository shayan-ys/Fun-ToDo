import React from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { Overlay, Button, Text } from 'react-native-elements';
import Icon from "react-native-vector-icons/Octicons";
import { FilterName, defaultFilterState, MAX_PRICE, styles } from "../../env";
import Filter from "./Filter";


export default class FiltersBar extends React.Component {
    onChange;
    headerHeight;
    static day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][ (new Date()).getDay() ];

    constructor(props) {
        super(props);

        this.onChange = props.onChange;
        this.headerHeight = props.headerHeight ? props.headerHeight : 140;
        this.state = {...defaultFilterState, extraFiltersVisible: true};

        this.updated = this.updated.bind(this);
    }

    updated(key, newValue) {
        this.setState({ [key]: newValue });
        this.onChange(this.state);
    };

    priceUnderDefault(key, newValue) {
        this.setState({ [FilterName.PriceUnder]: newValue ? defaultFilterState[FilterName.PriceUnder] : MAX_PRICE });
        this.onChange(this.state);
    };

    render() {
        return (
            <>
                <ScrollView horizontal={true} style={styles.filtersContainer}>
                    <Button
                        buttonStyle={styles.filterButton}
                        icon={<Icon
                            name='settings'
                            size={17}
                            style={{transform: [{rotate: '90deg'}]}}
                        />}
                        onPress={() => {this.setState({extraFiltersVisible: true})}}
                    />
                    <Filter display="Available Now" name={FilterName.AvailableNow} onChange={this.updated}/>
                    <Filter display="This Season" name={FilterName.ThisSeason} onChange={this.updated}/>
                    <Filter display={"On " + FiltersBar.day} name={FilterName.ThisDay} onChange={this.updated}/>
                    <Filter display="Under $$" name={FilterName.PriceUnder} onChange={this.priceUnderDefault}/>
                </ScrollView>

                <Overlay
                    isVisible={this.state.extraFiltersVisible}
                    fullScreen={false}
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height - this.headerHeight}
                    animationType='slide'
                    statusBarTranslucent={false}
                    windowBackgroundColor='rgba(0,0,0,0.2)'
                    transparent={true}
                >
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                icon={{
                                    name: "close",
                                    size: 27,
                                    color: "black"
                                }}
                                buttonStyle={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '50%', paddingTop: 8, paddingRight: 3, paddingBottom: 8, paddingLeft: 3 }}
                                onPress={() => {this.setState({extraFiltersVisible: false})}}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Filters</Text>
                            <Text>Hello from Overlay!</Text>
                        </View>
                    </View>
                </Overlay>
            </>
        );
    }
}
