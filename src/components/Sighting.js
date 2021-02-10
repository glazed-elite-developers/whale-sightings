import React, { useEffect, useMemo } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";

const ratio = 228 / 250;
const { width } = Dimensions.get("window");

export const MARGIN = 5;
export const CARD_WIDTH = width * 0.6;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
export const HEIGHT = CARD_HEIGHT + MARGIN * 2;

const Sighting = ({ item, x, index, updateRangePositions }) => {
    const contentInset = () => {
        const insetHorizontal = (width - CARD_WIDTH) / 2
        return {
            top: 0,
            right: insetHorizontal,
            bottom: 0,
            left: insetHorizontal
        };
    };


    const offsetForItem = (index) => {
        return CARD_WIDTH * index - contentInset().left;
    };

    const offsetCenter = offsetForItem(index);
    const offsetStart = offsetCenter - CARD_WIDTH / 2;
    const offsetEnd = offsetCenter + CARD_WIDTH / 2;

    useEffect(() => {
        index === 0 && updateRangePositions(offsetStart)
    }, [])

    const imageSrc = useMemo(() => item.species === 'orca' ?
        require("../../assets/icons/orca.png") :
        item.species === 'humpback' ?
            require("../../assets/icons/humpback.png") :
            require("../../assets/icons/whale.png")
        , [item.species])


    return (
        <Animated.View
            key={index}
            style={[styles.storeCard,
            {
                transform: [
                    {
                        scale: x.interpolate({
                            extrapolate: "clamp",
                            inputRange: [offsetStart, offsetCenter, offsetEnd],
                            outputRange: [0.9, 1.0, 0.9]
                        })
                    }
                ]
            }
            ]}>
            <View>
                <Image
                    style={styles.image}
                    source={imageSrc}
                    resizeMode="stretch"
                />
                <Text style={styles.name}>{item.location}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    storeCard: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginVertical: MARGIN,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position: 'relative',
        borderRadius: 10,
    },
    image: {
        width: 190,
        height: 120,
        borderRadius: 10
    },
    name: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});

export default Sighting;