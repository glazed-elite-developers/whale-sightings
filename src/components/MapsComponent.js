import React from 'react';
import MapView from 'react-native-maps'
import { StyleSheet } from 'react-native'

export const MapsComponent = ({ latitude = 0, longitude = 0 }) => {
  const region = {
    latitude,
    longitude,
    latitudeDelta: 9,
    longitudeDelta: 9,
  }

  return (
    <MapView
      maxZoomLevel={18}
      minZoomLevel={9}
      region={region}
      style={{ ...StyleSheet.absoluteFillObject }}
    >
      <MapView.Marker coordinate={region} />
    </MapView>
  );
};  