import api from './api.js'

export const create = async (payload) => {
  try {
    const { data } = await api.post('/event/create', payload)

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}

export const getAll = async () => {
  try {
    const { data } = await api.get('/event/getAll')

    return data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}
