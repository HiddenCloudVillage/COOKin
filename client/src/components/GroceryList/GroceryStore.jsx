import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import styled from 'styled-components';
import mapKey from '../../lib/mapKey';
import image from '../../../dist/icons/COOkit4.svg';

const axios = require('axios');

function GroceryStore() {
  const [center, setCenter] = useState('');
  const [stores, setStores] = useState();
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState();
  const [vicinity, setVicinity] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude}%2C${position.coords.longitude}&radius=5000&type=grocery_or_supermarket&key=${mapKey}`;
      axios({
        method: 'put',
        url: '/getStores',
        data: { url },
      })
        .then((res) => {
          const storeArray = res.data.results.map((store) => store);
          console.log('who do dis>', storeArray);
          setStores(storeArray);
        })
        .catch((err) => console.log('🚨', err));
    });
  }, []);

  const options = {
    mapId: 'e0dcd433510d5496',
  };
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };
  if (!stores) {
    return (
      <>
        <Title>Finding your nearest grocery stores...</Title>
        <Spinner id="spinner" src="icons/spinner.gif" />
      </>
    );
  }
  return (
    <LoadScript googleMapsApiKey={mapKey}>
      <Title>Here are your nearest grocery stores.</Title>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={center}
        options={options}
      >
        {stores.map((eachStore) => (
          <Marker
            onClick={() => {
              setSelected(eachStore.geometry.location);
              setVicinity(eachStore.vicinity);
              setName(eachStore.name);
            }}
            position={eachStore.geometry.location}
            icon={image}
            key={Math.floor(Math.random() * 20)}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{name}</h2>
              <p>{vicinity}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}

export default GroceryStore;

const Spinner = styled.img`
  size: auto;
  max-height: 70px;
  background-color: transparent;
`;

const StoreContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 20px;
  margin: 0;
  margin-right: 1%;
  margin-bottom: 3%;
`;
