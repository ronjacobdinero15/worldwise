/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import _ from 'lodash'

import { useCities } from '../../contexts/CitiesContext'
import Spinner from '../Spinner/Spinner'
import Message from '../Message/Message'
import CountryItem from '../CountryItem/CountryItem'
import styles from './CountryList.module.css'

function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  const uniqueCountries = _.uniqBy(cities, 'country')

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map(country => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  )
}

export default CountryList
