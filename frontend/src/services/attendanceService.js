import api from './api.js'

export const scanAttendance = async (qrPayload) => {
  try {
    const res = await api.post('/operator/scan', { qrPayload })

    return res.data
  } catch (e) {
    console.error(e)
    throw new Error('Something is wrong. Please try again later.')
  }
}


