import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleShowPasswordToggle = () => setShowPassword(!showPassword)

  const onSubmitSuccess = (jwtToken) => {
    setIsLoading(false)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = (msg) => {
    setIsLoading(false)
    setShowError(true)
    setErrorMsg(msg)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      onSubmitFailure('Username and Password are required')
      return
    }
    setIsLoading(true)
    setShowError(false)
    setErrorMsg('')

    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg || 'Incorrect details')
      }
    } catch (err) {
      console.error(err)
      onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-container">
      <form className="login-card glass-panel" onSubmit={handleFormSubmit}>
        <div className="login-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-assess-logo.png"
            alt="login website logo"
            className="login-logo"
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="login-input"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="showPassword"
            className="login-checkbox"
            checked={showPassword}
            onChange={handleShowPasswordToggle}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button type="submit" className="login-btn gradient-btn" disabled={isLoading}>
          {isLoading ? <div className="button-spinner" /> : 'Login'}
        </button>
        {showError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
