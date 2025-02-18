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
  } catch (error: any) {
    return { status: error?.statusCode, data: error.message }
  }
}

export const register = async (
  name: string,
  last_name: string,
  email: string,
  birth_date: string,
  password: string,
) => {
  try {
    const response = await api.post('/auth/register', {
      name,
      last_name,
      email,
      birth_date,
      password,
    })
    return { status: response.status, data: response.data }
  } catch (error: any) {
    return { status: error?.statusCode, data: error.message }
  }
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('access_level')
}
