import './index.css'

const QuestionNumberItem = (props) => {
  const {number, isActive, isAnswered, onClickNumber} = props

  let className = 'number-btn'
  if (isAnswered) {
    className += ' answered'
  }
  if (isActive) {
    className += ' active'
  }

  const onClickBtn = () => {
    onClickNumber(number - 1)
  }

  return (
    <button type="button" className={className} onClick={onClickBtn}>
      {number}
    </button>
  )
}

export default QuestionNumberItem
