import './index.css'

const Select = (props) => {
  const {optionsList, selectedOptionId, onChangeOption} = props

  const onSelectChange = (e) => {
    onChangeOption(e.target.value)
  }

  return (
    <div className="select-dropdown-container">
      <select className="custom-select-element" value={selectedOptionId} onChange={onSelectChange}>
        {optionsList.map((option) => (
          <option key={option.id} value={option.id} className="custom-select-option">
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
