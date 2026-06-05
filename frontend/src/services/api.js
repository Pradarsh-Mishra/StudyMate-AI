import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleError = (error) => {
  if (error.response) {
    return Promise.reject(error.response.data || { message: error.message });
  }
  return Promise.reject({ message: error.message });
};

export const healthCheck = () => api.get('/').then((res) => res.data).catch(handleError);
export const uploadStudyMaterial = (file, onUploadProgress) => {
  const data = new FormData();
  data.append('file', file);
  return api.post('/upload_study_material/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  }).then((res) => res.data).catch(handleError);
};
export const uploadImageNotes = (file, onUploadProgress) => {
  const data = new FormData();
  data.append('file', file);
  return api.post('/upload_image_notes/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  }).then((res) => res.data).catch(handleError);
};
export const askAItutor = (question) => api.post('/ask', { question }).then((res) => res.data).catch(handleError);
export const voiceTutor = (transcript) => api.post('/voice_tutor', { transcript }).then((res) => res.data).catch(handleError);
export const voiceTutorFetch = async (transcript) => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${base.replace(/\/$/, '')}/voice_tutor`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript })
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      return Promise.reject(errorBody || { message: res.statusText });
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return Promise.reject({ message: err.message });
  }
};
export const generateSummary = () => api.post('/summary').then((res) => res.data).catch(handleError);
export const generateSummaryFetch = async () => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${base.replace(/\/$/, '')}/summary`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      return Promise.reject(errorBody || { message: res.statusText });
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return Promise.reject({ message: err.message });
  }
};
export const generateQuiz = (payload) => api.post('/quiz', payload).then((res) => res.data).catch(handleError);
export const generateStudyPlan = (payload) => api.post('/study_plan', payload).then((res) => res.data).catch(handleError);
export const analyzeProgress = (payload) => api.post('/analyze_progress', payload).then((res) => res.data).catch(handleError);

export default api;
