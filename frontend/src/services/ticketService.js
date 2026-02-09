import api from './api.js'

export const create = async (payload) => {
  try {
    const { data } = await api.post('/ticket/create', payload)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getById = async (payload) => {
  try {
    const { data } = await api.get(`/ticket/${payload.ticketId}`)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getQR = async (payload) => {
  try {
    const { data } = await api.get(`/ticket/${payload.ticketId}/qr`)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getByUserId = async (payload) => {
  try {
    const { data } = await api.get(`/ticket/user/${payload.userId}`)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}
