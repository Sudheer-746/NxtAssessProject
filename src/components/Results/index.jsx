import {useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import EvaluationContext from '../../context/EvaluationContext'
import Header from '../Header'
import './index.css'

const Results = () => {
  const {
    score,
    timeTakenInSeconds,
    isSubmitted,
    isTimeUp,
    resetAssessment,
  } = useContext(EvaluationContext)
  const navigate = useNavigate()

  const handleReattempt = () => {
    navigate('/assessment', {replace: true})
  }

  // Formatting seconds to standard HH:MM:SS for display
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const formattedHrs = hours < 10 ? `0${hours}` : hours
    const formattedMins = minutes < 10 ? `0${minutes}` : minutes
    const formattedSecs = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedHrs}:${formattedMins}:${formattedSecs}`
  }

  // Defensive programming: redirect to home if no submission state is active
  if (!isSubmitted && !isTimeUp) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Header />
      <div className="results-container">
        <div className="results-card glass-panel">
          {isSubmitted && (
            <div className="results-view submit-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/submit-img.png"
                alt="submit"
                className="results-img"
              />
              <h1 className="results-heading">Congrats! You completed the assessment</h1>
              <div className="stats-box">
                <div className="stat-item">
                  <p className="stat-label">Time Taken</p>
                  <p className="stat-value">{formatTime(timeTakenInSeconds)}</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Your score</p>
                  <p className="stat-value highlight-score">{score}</p>
                </div>
              </div>
            </div>
          )}

          {isTimeUp && (
            <div className="results-view time-up-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/time-up-img.png"
                alt="time up"
                className="results-img"
              />
              <h1 className="results-heading animate-pulse">Time is up!</h1>
              <p className="results-desc">
                You did not complete the assessment within the time
              </p>
              <div className="stats-box">
                <div className="stat-item">
                  <p className="stat-label">Your score</p>
                  <p className="stat-value highlight-score">{score}</p>
                </div>
              </div>
            </div>
          )}

          <button type="button" className="reattempt-btn gradient-btn" onClick={handleReattempt}>
            Reattempt
          </button>
        </div>
      </div>
    </>
  )
}

export default Results
