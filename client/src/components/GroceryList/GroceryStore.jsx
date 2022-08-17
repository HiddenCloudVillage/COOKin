import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import mapKey from '../../lib/mapKey';

function GroceryStore() {
  const [center, setCenter] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const mapStyles = {
    height: '50vh',
    width: '50%',
  };

  return (
    <LoadScript googleMapsApiKey={mapKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={center} />
    </LoadScript>
  );
}

export default GroceryStore;
