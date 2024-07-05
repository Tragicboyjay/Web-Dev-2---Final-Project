import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getPatientProfileByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient profile', error);
    throw error;
  }
};

export const updatePatientEmail = async (email: string, newEmail: string) => {
  try {
    const response = await axios.put(`${API_URL}/email`, {
      email,
      newEmail,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating patient email', error);
    throw error;
  }
};
