import api from '../api'

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('user_id', response.data.id)
      localStorage.setItem('access_level', response.data.access_level)
    }
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log('inside', error)
  }
}

export const register = async (email: string, password: string) => {
  return api.post('/auth/register', { email, password })
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('access_level')
}
