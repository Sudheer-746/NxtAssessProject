import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import EvaluationContext from './context/EvaluationContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [score, setScore] = useState(0)
  const [timeTakenInSeconds, setTimeTakenInSeconds] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)

  const resetAssessment = () => {
    setScore(0)
    setTimeTakenInSeconds(0)
    setIsSubmitted(false)
    setIsTimeUp(false)
  }

  return (
    <BrowserRouter>
      <EvaluationContext.Provider
        value={{
          score,
          timeTakenInSeconds,
          isSubmitted,
          isTimeUp,
          setScore,
          setTimeTakenInSeconds,
          setIsSubmitted,
          setIsTimeUp,
          resetAssessment,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </EvaluationContext.Provider>
    </BrowserRouter>
  )
}

export default App
