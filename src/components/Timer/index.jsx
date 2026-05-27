import './index.css'

const Timer = (props) => {
  const {timeLeft} = props

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const formattedHrs = hours < 10 ? `0${hours}` : hours
    const formattedMins = minutes < 10 ? `0${minutes}` : minutes
    const formattedSecs = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedHrs}:${formattedMins}:${formattedSecs}`
  }

  // Red alert state when less than 2 minutes remain
  const isUrgent = timeLeft < 120
  const urgentClass = isUrgent ? 'urgent' : ''

  return (
    <div className={`timer-container glass-panel ${urgentClass}`}>
      <div className="timer-header">
        <p className="timer-label">Time Left</p>
      </div>
      <div className="timer-display-box">
        <p className="timer-value">{formatTime(timeLeft)}</p>
      </div>
    </div>
  )
}

export default Timer
