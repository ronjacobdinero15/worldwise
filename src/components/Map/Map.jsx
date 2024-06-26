import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { useCities } from '../../contexts/CitiesContext'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useUrlPosition } from '../../hooks/useUrlPosition'
import Button from '../Button/Button'
import styles from './Map.module.css'

function Map() {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)])
    },
    [mapLat, mapLng]
  )

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    },
    [geolocationPosition]
  )

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
        /* Since we can't use onClick property here, 
          We'll use useMapEvents hook by leaflet inside
          a function called ChangeCenter,
          so when we click it opens up the form and
          provide us with latlng coordinates
        */
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

// Move the map to the currently selected/clicked city
function ChangeCenter({ position }) {
  // useMap hook given by leaflet
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  /*   useMapEvent is a hook and pass in an object, 
  where we can define few properties for different type of events. 
  One of them is the click event */
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}

export default Map
