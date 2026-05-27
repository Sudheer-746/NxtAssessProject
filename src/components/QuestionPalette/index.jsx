import QuestionNumberItem from '../QuestionNumberItem'
import './index.css'

const QuestionPalette = (props) => {
  const {
    answeredCount,
    unansweredCount,
    activeIndex,
    selectedAnswers,
    questionsList,
    onClickNumber,
    onSubmit,
    total,
  } = props

  const renderNumberItems = () => {
    const listToUse = questionsList || []
    return listToUse.map((question, index) => {
      const questionId = question.id || `num-item-${index + 1}`
      const isAnswered = selectedAnswers[questionId] !== undefined
      return (
        <li key={questionId} className="number-list-item">
          <QuestionNumberItem
            key={questionId}
            number={index + 1}
            isActive={index === activeIndex}
            isAnswered={isAnswered}
            onClickNumber={onClickNumber}
          />
        </li>
      )
    })
  }

  return (
    <div className="palette-container glass-panel">
      <div className="counts-summary">
        <div className="count-item answered-summary">
          <p className="count-badge answered-badge">{answeredCount}</p>
          <p className="count-label">Answered Questions</p>
        </div>
        <div className="count-item unanswered-summary">
          <p className="count-badge unanswered-badge">{unansweredCount}</p>
          <p className="count-label">Unanswered Questions</p>
        </div>
      </div>
      <hr className="palette-divider" />
      <div className="palette-grid-section">
        <h1 className="palette-grid-title-main">{`Questions (${total})`}</h1>
        <h3 className="palette-grid-title">Question Palette</h3>
        <ul className="numbers-grid">{renderNumberItems()}</ul>
      </div>
      <button type="button" className="submit-assessment-btn gradient-btn" onClick={onSubmit}>
        Submit Assessment
      </button>
    </div>
  )
}

export default QuestionPalette
