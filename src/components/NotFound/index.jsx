import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <div className="not-found-content glass-panel">
        <img
          src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
          alt="not found"
          className="not-found-img"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-desc">
          We are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </>
)

export default NotFound
