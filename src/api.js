import axios from 'axios';

const BASE_URL = "https://job-tracker-backend-ni6p.onrender.com/api/jobs";

export const getJobs = () => axios.get(BASE_URL);

export const addJob = (jobData) => axios.post(BASE_URL, jobData);

export const deleteJob = (id) => axios.delete(`${BASE_URL}/${id}`);

export const updateJobStatus = (id, status) =>
  axios.put(`${BASE_URL}/${id}`, { status });
