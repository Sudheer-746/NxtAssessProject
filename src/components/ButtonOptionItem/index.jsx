import './index.css'

const ButtonOptionItem = (props) => {
  const {optionDetails, isSelected, onClickOption} = props
  const {id, text} = optionDetails

  const className = isSelected ? 'option-btn selected' : 'option-btn'

  const onClickBtn = () => {
    onClickOption(id)
  }

  return (
    <button type="button" className={className} onClick={onClickBtn}>
      {text}
    </button>
  )
}

export default ButtonOptionItem
