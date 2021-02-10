import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Sighting from '../components/Sighting';
import SearchBar from '../components/SearchBar';
import { MapsComponent } from '../components/MapsComponent';
import { CARD_WIDTH } from '../components/Sighting';
import { Context } from '../context/WhaleSightingsContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = (props) => {
    const { state, fetchSightingsList } = useContext(Context);
    const [locations, setLocations] = useState([]);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [offsetStart, setOffsetStart] = useState(0);
    const [index, setIndex] = useState(0);
    const x = new Animated.Value(0);

    const updatePosition = useCallback((index) => {
        setLatitude(locations[index].latitude);
        setLongitude(locations[index].longitude);
    });

    useEffect(() => {
        fetchSightingsList();
    }, []);

    useEffect(() => {
        if (state.list.length) {
            setLocations(state.list)
            setLatitude(state.list[0].latitude);
            setLongitude(state.list[0].longitude);
        }
    }, [state.list]);

    const updateState = useCallback((event) => {
        let position = event.nativeEvent.contentOffset.x;
        let i = Math.floor((position - offsetStart) / CARD_WIDTH)
        if (index !== i) {
            updatePosition(i);
            setIndex(i);
        }
    })

    const onScroll = Animated.event(
        [{
            nativeEvent: {
                contentOffset: { x }
            }
        }], {
        listener: (event) => updateState(event),
        useNativeDriver: true,
    }
    );

    const _updateRangePositions = (offsetStart) => {
        setOffsetStart(offsetStart)
    }

    return (
        <View style={{ flex: 1 }}>
            <MapsComponent
                latitude={latitude}
                longitude={longitude}
            />
            <View style={styles.searchBar}>
                <SearchBar />
            </View>
            <View style={styles.listStores}>
                <AnimatedFlatList
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={locations}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate('Sighting', { id: item.id })
                            }>
                            <Sighting
                                key={index}
                                index={index}
                                item={item}
                                x={x}
                                updateRangePositions={_updateRangePositions} />
                        </TouchableOpacity>
                    )
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listStores: {
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    searchBar: {
        marginTop: 5,
        width: '100%',
        position: 'absolute',
        top: 0
    }
});

export default HomeScreen;