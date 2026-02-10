import api from './api.js'

export const create = async (payload) => {
  try {
    const { data } = await api.post('/tickets/create', payload)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getByTicketId = async (payload) => {
  try {
    const { data } = await api.get(`/tickets/${payload.ticketId}`)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getById = async (id) => {
  try {
    const res = await api.get(`/tickets/${id}`)

    return res.data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}


export const getQR = async (ticketId) => {
  try {
    const res = await api.get(`/tickets/${ticketId}/qr`)

    return res.data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getByUserId = async (userId) => {
  try {
    const res = await api.get(`/tickets/user/${userId}`)

    return res.data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}
