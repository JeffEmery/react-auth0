import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (!isLoading && !isAuthenticated)
    return <button onClick={loginWithRedirect}>Log in</button>
  else return null
}

export default LoginButton
