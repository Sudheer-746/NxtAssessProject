import './index.css'

const ImageOptionItem = (props) => {
  const {optionDetails, isSelected, onClickOption} = props
  const {id, text} = optionDetails
  const imageUrl = optionDetails.image_url || optionDetails.imageUrl || ''

  const className = isSelected ? 'image-option-btn selected' : 'image-option-btn'

  const onClickBtn = () => {
    onClickOption(id)
  }

  return (
    <button type="button" className={className} onClick={onClickBtn}>
      <img src={imageUrl} alt={text} className="image-option-img" />
    </button>
  )
}

export default ImageOptionItem
