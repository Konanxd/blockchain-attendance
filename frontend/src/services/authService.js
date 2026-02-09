import api from './api.js'

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password })
  console.log(res)
  localStorage.setItem('token', res.data.token)

  return res.data
}

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', {
    name,
    email,
    password,
  })

  return res.data
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
