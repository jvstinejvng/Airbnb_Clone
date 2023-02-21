import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api'
import { getAPIKey } from '../../store/maps'
import house from './house.png'
import mapOptions from './MapStyle'

import '../CSS/Maps.css'


const Maps = ({ spot }) => {
  const dispatch = useDispatch()
  const APIKey = useSelector(state => state.map.APIKey)

  useEffect(() => {
    dispatch(getAPIKey())
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: APIKey,
    id: 'google-maps-script'
  })

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: Number(spot?.lat),
    lng: Number(spot?.lng)
  };

  const centerIcon = {
    lat: Number(spot?.lat),
    lng: Number(spot?.lng)
  };


  const circleOptions = {
    strokeColor: '#f3b2d0',
    strokeOpacity: 0.45,
    strokeWeight: 0,
    fillColor: '#f3b2d0',
    fillOpacity: 0.45,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 1200
  }

  return (
    <div className='maps-outer' id='maps'>
      <div className='maps-header'>Where you'll be</div>
      <div className='maps-main'>
        {isLoaded &&
          (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              options={{
                styles: mapOptions,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                clickableIcons: false,
              }}>
              <Circle
                center={center}
                options={circleOptions}
              />
              <Marker position={centerIcon} icon={{
                url: house,
                scaledSize: { width: 40, height: 40 },
                anchor: { x: 20, y: 20 },
              }} />
            </GoogleMap>
          )}
      </div>
    </div>
  )
}

// React.memo prevents rerenders if props are unchanged
export default React.memo(Maps)
