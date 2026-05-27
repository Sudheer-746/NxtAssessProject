import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <nav className="header-container glass-panel">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-assess-logo.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
