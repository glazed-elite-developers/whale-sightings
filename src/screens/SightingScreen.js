import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Context } from '../context/WhaleSightingsContext';

const SightingScreen = ({ navigation }) => {
  const { state, fetchSighting } = useContext(Context);
  const [sighting, setSighting] = useState({});
  const id = navigation.getParam('id');

  useEffect(() => {
    if (state.byId[id]) {
      setSighting(state.byId[id]);
    }
  }, [state.byId[id]]);

  useEffect(() => {
    fetchSighting(id);
  }, [id])

  return (
    <View>
      <Text>{sighting.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300
  }
});

export default SightingScreen;
