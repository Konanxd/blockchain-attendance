import api from './api.js'

export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  localStorage.setItem('token', data.token)

  return data.user
}

export const register = async (name, email, password) => {
  const payload = await api.post('/auth/register', {
    name,
    email,
    password,
  })

  return data
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  return !!getToken()
}

export const logout = () => {
  localStorage.removeItem('token')
}
