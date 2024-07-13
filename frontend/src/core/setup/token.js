export function setTokens(accessToken = '', refreshToken = '') {
  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
}

export function getTokens() {
  return {
    accessToken: localStorage.getItem('access-token') || '',
    refreshToken: localStorage.getItem('refresh-token') || ''
  };
}
