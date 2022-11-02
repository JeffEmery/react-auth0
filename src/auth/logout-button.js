import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { isAuthenticated, isLoading, logout } = useAuth0()

  if (!isLoading && isAuthenticated) {
    return (
      <button
        onClick={() => {
          logout({ returnTo: window.location.origin })
        }}
      >
        Log out
      </button>
    )
  } else {
    return null
  }
}

export default LogoutButton
