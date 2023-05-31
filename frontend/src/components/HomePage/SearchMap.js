import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { getAPIKey } from '../../store/maps'
import mapOptions from '../Maps/MapStyle'
import priceMarker from './price-marker.png'
import selectedPriceMarker from './selected-price-marker.png'

import "../CSS/SearchMap.css"

const SearchMap = ({ searchSpots }) => {
  let { result } = useParams()
  let { pets } = useParams()
  const dispatch = useDispatch()
  const APIKey = useSelector(state => state.map.APIKey)
  const [map, setMap] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [midLat, setMidLat] = useState(0)
  const [midLng, setMidLng] = useState(0)
  const [selected, setSelected] = useState({})
  const [selectedId, setSelectedId] = useState()


  useEffect(() => {
    dispatch(getAPIKey())

    if (searchSpots.length > 0) {

      const allLats = searchSpots?.map((spot) => spot.lat)
      const allLngs = searchSpots?.map((spot) => spot.lng)

      const maxLat = Math.max(...allLats)
      const minLat = Math.min(...allLats)
      const maxLng = Math.max(...allLngs)
      const minLng = Math.min(...allLngs)

      const avgLat = (maxLat + minLat) / 2
      const avgLng = (maxLng + minLng) / 2

      setMidLat(avgLat)
      setMidLng(avgLng)
    }

    if (searchSpots?.length > 15) {
      setZoom(2)
    } else {
      setZoom(5)
    }

    if (result === 'indonesia') setZoom(9)

  }, [result, pets])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: APIKey,
    id: 'google-maps-script'
  })

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: Number(midLat),
    lng: Number(midLng)
  };

  return (
    <div className='search-google-map-outer'>
      {isLoaded &&
        (<GoogleMap
          // onLoad={onLoad}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{
            styles: mapOptions,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            scrollwheel: true,
            clickableIcons: false
      
          }}
        >
          {searchSpots.map((spot) => {
            return (
              <>
                <Marker
                  position={{
                    key: spot.id,
                    lat: Number(spot.lat),
                    lng: Number(spot.lng)
                  }}
                  onClick={() => { setSelected(spot); setSelectedId(spot.id) }}
                  label={{ text: `$${spot.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, color: spot.id === selectedId ? 'white' : 'black' }}
                  icon={{
                    url: spot.id === selectedId ? selectedPriceMarker : priceMarker,
                    scaledSize: { width: 60, height: 26 },
                    anchor: { x: 20, y: 0 },
                  }}
                />
              </>
            )
          })}
          {selected.id &&
            (<InfoWindow
              position={{
                lat: Number(selected.lat),
                lng: Number(selected.lng)
              }}
              onCloseClick={() => { setSelected({}); setSelectedId(0) }}
            >
              <div className='selected-spot-info'>
                <Link to={`/spots/${selected?.id}`}>
                  <img src={selected?.images[0]?.url} className='selected-spot-img'></img>
                </Link>
                <div>
                  <div className='selected-spot-name'>{selected?.name}</div>
                  <div><span className='selected-spot-price'>{`$${selected?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span> <span>night</span></div>
                </div>
              </div>
            </InfoWindow>
            )}
        </GoogleMap>
        )}
    </div>
  )
}

export default React.memo(SearchMap)
