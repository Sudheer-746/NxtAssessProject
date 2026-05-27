import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <div className="instructions-section glass-panel">
            <h1 className="instructions-title">Instructions</h1>
            <ol className="instructions-list">
              <li className="instruction-item">Total Questions: 10</li>
              <li className="instruction-item">Types of Questions: MCQs</li>
              <li className="instruction-item">Duration: 10 Mins</li>
              <li className="instruction-item">Marking Scheme: Every Correct response, get 1 mark</li>
              <li className="instruction-item">All the progress will be lost, if you reload during the assessment</li>
            </ol>
            <Link to="/assessment" className="start-assessment-link">
              <button
                type="button"
                className="start-assessment-btn gradient-btn"
              >
                Start Assessment
              </button>
            </Link>
          </div>
          <div className="banner-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/assessment-image.png"
              alt="assessment"
              className="assessment-banner-img"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
