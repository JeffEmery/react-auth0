import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()
  const [userMetadata, setUserMetadata] = useState(null)

  useEffect(() => {
    if (isLoading) return

    const getUserMetadata = async () => {
      // Use the default tenant domain when using the management api
      // https://auth0.com/docs/customize/custom-domains/configure-features-to-use-custom-domains#auth0-apis
      // However, the api returns "bad issuer" from the access token when a custom domain is used for the initial login
      // so we have to login with the default tenant domain to use the access token for the management api
      // https://support.auth0.com/tickets/01480047

      const domain = '[DEFAULT_TENANT_DOMAIN].auth0.com'

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        })

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const { user_metadata } = await metadataResponse.json()

        setUserMetadata(user_metadata)
      } catch (e) {
        console.log(e.message)
      }
    }

    getUserMetadata()
  }, [isLoading, getAccessTokenSilently, user?.sub])

  if (!isLoading && isAuthenticated) {
    return (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          'No user metadata defined'
        )}
      </div>
    )
  } else return null
}

export default Profile
