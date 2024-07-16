import axios from 'axios';
import { getTokens } from '../core/setup/token';

const axioInstance = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    headers: {
        'Authorization': `Bearer ${getTokens().refreshToken}`
      }
});

export const getAllEventsApi = async () => {
  const response = await axioInstance.get("/events");
  return response.data;
};

export const createEventApi = async (data) => {
    const response = await axioInstance.post("/admins/events", data);
    return response.data;
  };

  export const getEventApi = async (id) => {
    const response = await axioInstance.get(`/events/${id}`);
    return response.data;
  };

  export const deleteEventApi = async (id) => {
    const response = await axioInstance.delete(`/admins/events/${id}`);
    return response.data;
  };

  export const updateEventApi = async (data) => {
    const response = await axioInstance.put(`/admins/events/${data.id}`, data);
    return response.data;
  };