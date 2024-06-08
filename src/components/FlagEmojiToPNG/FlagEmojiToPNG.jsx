import convertToEmoji from '../../utils/convertToEmoji'

function FlagEmojiToPNG({ emoji }) {
  const code = convertToEmoji(emoji)
  const countryCode = Array.from(code, codeUnit => codeUnit.codePointAt())
    .map(char => String.fromCharCode(char - 127397).toLocaleLowerCase())
    .join('')
  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={code} />
}

export default FlagEmojiToPNG
