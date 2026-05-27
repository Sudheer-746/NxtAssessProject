import ButtonOptionItem from '../ButtonOptionItem'
import ImageOptionItem from '../ImageOptionItem'
import Select from '../Select'
import './index.css'

const Question = (props) => {
  const {activeQuestion, selectedOptionId, onClickOption, activeQuestionNumber} = props
  const {question_text, options} = activeQuestion
  const optionsType = (activeQuestion.options_type || activeQuestion.option_type || '').toUpperCase()

  const renderOptions = () => {
    switch (optionsType) {
      case 'DEFAULT':
        return (
          <ul className="default-options-container">
            {options.map((option) => (
              <li key={option.id} className="default-option-list-item">
                <ButtonOptionItem
                  key={option.id}
                  optionDetails={option}
                  isSelected={option.id === selectedOptionId}
                  onClickOption={onClickOption}
                />
              </li>
            ))}
          </ul>
        )
      case 'IMAGE':
        return (
          <ul className="image-options-list">
            {options.map((option) => (
              <li key={option.id} className="image-option-list-item">
                <ImageOptionItem
                  key={option.id}
                  optionDetails={option}
                  isSelected={option.id === selectedOptionId}
                  onClickOption={onClickOption}
                />
              </li>
            ))}
          </ul>
        )
      case 'SINGLE_SELECT':
      case 'SINGLE SELECT':
        return (
          <>
            <Select
              optionsList={options}
              selectedOptionId={selectedOptionId}
              onChangeOption={onClickOption}
            />
            <p className="single-select-default-text">First option is selected by default</p>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="question-card glass-panel" data-testid="questionItem">
      <p className="question-index-label">Question {activeQuestionNumber}</p>
      <p className="question-text">{question_text}</p>
      <hr className="divider" />
      <div className="options-wrapper">{renderOptions()}</div>
    </div>
  )
}

export default Question
