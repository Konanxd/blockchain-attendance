import api from './api.js'
import axios from 'axios'; // Tambahkan baris ini!

export const scanAttendance = async (data) => {
  // Gunakan instance axios yang benar
  const response = await axios.post('http://localhost:3000/api/operator/scan', data);
  return response.data;
};

export const getEventAttendees = async (eventId) => {
  const response = await axios.get(`http://localhost:3000/api/operator/${eventId}`);
  return response.data;
};