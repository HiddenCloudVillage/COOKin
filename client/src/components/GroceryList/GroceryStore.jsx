import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, usLoadScript } from '@react-google-maps/api';
import mapKey from '../../lib/mapKey';
import styled from 'styled-components';

function GroceryStore() {
  const [center, setCenter] = useState('');
  // const [longitude, setLongitude] = useState('');

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
    width: '100%',
  };

  return (
    <StoreContainer>
      <LoadScript googleMapsApiKey={mapKey}>
        <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={center} />
      </LoadScript>
    </StoreContainer>
  );
}

export default GroceryStore;

const StoreContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`
