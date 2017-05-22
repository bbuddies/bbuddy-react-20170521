let loadToken = () => {
  try {
    const serializedToken = localStorage.getItem('token');
    if (serializedToken === null) {
      return {}
    }
    return JSON.parse(serializedToken)
  } catch (err) {
    return {}
  }
}

let storedToken = loadToken()

export function storeToken(token){
  if (token.accessToken != null && token.client != null && token.expiry != null && token.type != null && token.uid != null) {
    storedToken = token
  }
}
export function fetchToken(){
  return storedToken
}
