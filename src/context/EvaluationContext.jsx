import React from 'react'

const EvaluationContext = React.createContext({
  score: 0,
  timeTakenInSeconds: 0,
  isSubmitted: false,
  isTimeUp: false,
  setScore: () => {},
  setTimeTakenInSeconds: () => {},
  setIsSubmitted: () => {},
  setIsTimeUp: () => {},
  resetAssessment: () => {},
})

export default EvaluationContext
