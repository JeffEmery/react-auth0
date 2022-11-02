import { useAuth0 } from '@auth0/auth0-react'

/// Sign up flow only works with the "New Universal Login Experience"
const SignupButton = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (!isLoading && !isAuthenticated) {
    return (
      <button
        onClick={() =>
          loginWithRedirect({
            screen_hint: 'signup',
          })
        }
      >
        Sign Up
      </button>
    )
  } else return null
}

export default SignupButton
