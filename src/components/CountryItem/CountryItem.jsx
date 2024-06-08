import FlagEmojiToPNG from '../FlagEmojiToPNG/FlagEmojiToPNG'
import styles from './CountryItem.module.css'

function CountryItem({ country }) {
  const emoji = country.emoji

  return (
    <li className={styles.countryItem}>
      <span>{emoji && <FlagEmojiToPNG emoji={emoji} />}</span>
      <span>{country.country}</span>
    </li>
  )
}

export default CountryItem
