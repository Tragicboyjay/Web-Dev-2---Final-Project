import axios from 'axios';

const API_URL = 'http://localhost:8080/doctor';

export const getDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addDoctor = async (doctorData: any) => {
  const response = await axios.post(API_URL, doctorData);
  return response.data;
};
