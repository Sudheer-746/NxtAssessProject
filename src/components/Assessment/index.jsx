import {useState, useEffect, useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import EvaluationContext from '../../context/EvaluationContext'
import Header from '../Header'
import Question from '../Question'
import QuestionPalette from '../QuestionPalette'
import Timer from '../Timer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Assessment = () => {
  const navigate = useNavigate()
  const {
    setScore,
    setTimeTakenInSeconds,
    setIsSubmitted,
    setIsTimeUp,
    resetAssessment,
  } = useContext(EvaluationContext)

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [questionsList, setQuestionsList] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [totalQuestions, setTotalQuestions] = useState(0)

  // Reset context states on initial mount
  useEffect(() => {
    resetAssessment()
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set default option for active SINGLE_SELECT question dynamically
  useEffect(() => {
    if (questionsList.length > 0) {
      const activeQuestion = questionsList[activeIndex]
      const type = (activeQuestion.options_type || activeQuestion.option_type || '').toUpperCase()
      if (type === 'SINGLE_SELECT' || type === 'SINGLE SELECT') {
        setSelectedAnswers((prev) => {
          if (!prev[activeQuestion.id] && activeQuestion.options?.length > 0) {
            return {
              ...prev,
              [activeQuestion.id]: activeQuestion.options[0].id,
            }
          }
          return prev
        })
      }
    }
  }, [activeIndex, questionsList])

  // Timer tick effect
  useEffect(() => {
    let intervalId = null
    if (apiStatus === apiStatusConstants.success) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [apiStatus])

  // Helper score calculator
  const calculateScore = (questions, answers) => {
    let scoreVal = 0
    questions.forEach((q) => {
      const selectedOptionId = answers[q.id]
      if (selectedOptionId) {
        const selectedOption = q.options.find((opt) => opt.id === selectedOptionId)
        if (selectedOption && String(selectedOption.is_correct) === 'true') {
          scoreVal += 1
        }
      }
    })
    return scoreVal
  }

  // Timer ended auto-submit effect
  useEffect(() => {
    if (timeLeft === 0 && apiStatus === apiStatusConstants.success) {
      const finalScore = calculateScore(questionsList, selectedAnswers)
      setScore(finalScore)
      setTimeTakenInSeconds(600)
      setIsTimeUp(true)
      setIsSubmitted(false)
      navigate('/results', {replace: true})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, apiStatus])

  // Authenticated Fetch questions
  const getQuestions = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const token = Cookies.get('jwt_token')
    const questionsApiUrl = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(questionsApiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        const fetchedQuestions = data.questions
        setQuestionsList(fetchedQuestions)
        setTotalQuestions(data.total !== undefined ? data.total : fetchedQuestions.length)
        setSelectedAnswers({})
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (err) {
      console.error(err)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const handleOptionSelection = (optionId) => {
    const activeQuestion = questionsList[activeIndex]
    setSelectedAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optionId,
    }))
  }

  const handleNextQuestion = () => {
    if (activeIndex < questionsList.length - 1) {
      setActiveIndex((prev) => prev + 1)
    }
  }

  const handleQuestionNumberJump = (index) => {
    setActiveIndex(index)
  }

  const handleManualSubmit = () => {
    const finalScore = calculateScore(questionsList, selectedAnswers)
    setScore(finalScore)
    const timeTaken = 600 - timeLeft
    setTimeTakenInSeconds(timeTaken)
    setIsSubmitted(true)
    setIsTimeUp(false)
    navigate('/results', {replace: true})
  }

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <div className="loader" />
    </div>
  )

  const renderFailureView = () => (
    <div className="assessment-failure-container glass-panel">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">We are having some trouble processing your request. Please try again.</p>
      <button type="button" className="retry-btn gradient-btn" onClick={getQuestions}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    if (questionsList.length === 0) return null

    const activeQuestion = questionsList[activeIndex]
    const selectedOptionId = selectedAnswers[activeQuestion.id]
    const answeredCount = Object.keys(selectedAnswers).length
    const unansweredCount = questionsList.length - answeredCount
    const isLastQuestion = activeIndex === questionsList.length - 1

    return (
      <div className="assessment-layout">
        <div className="question-column">
          <Question
            activeQuestion={activeQuestion}
            selectedOptionId={selectedOptionId}
            onClickOption={handleOptionSelection}
            activeQuestionNumber={activeIndex + 1}
          />
          <div className="nav-actions">
            {!isLastQuestion && (
              <button
                type="button"
                className="next-btn gradient-btn"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
        <div className="sidebar-column">
          <div className="timer-wrapper">
            <Timer timeLeft={timeLeft} />
          </div>
          <div className="palette-wrapper">
            <QuestionPalette
              total={totalQuestions}
              answeredCount={answeredCount}
              unansweredCount={unansweredCount}
              activeIndex={activeIndex}
              selectedAnswers={selectedAnswers}
              questionsList={questionsList}
              onClickNumber={handleQuestionNumberJump}
              onSubmit={handleManualSubmit}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderAssessmentContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="assessment-container">
        <div className="assessment-content-wrapper">{renderAssessmentContent()}</div>
      </div>
    </>
  )
}

export default Assessment
