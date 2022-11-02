import LoginButton from './auth/login-button'
import LogoutButton from './auth/logout-button'
import SignupButton from './auth/signup-button'
import Profile from './auth/profile'

function App() {
  return (
    <div>
      <div>
        <LoginButton />
      </div>
      <div>
        <SignupButton />
      </div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <Profile />
      </div>
    </div>
  )
}

export default App
