import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: false
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );


export async function fetchNotes() {
    const response = await axiosInstance.get(`/api/notes`);
    const eventData = response.data;
    return eventData;
}

export async function addNote(title, content) {
    const newNote = {
        title: title,
        content: content
      }
    return await axiosInstance
      .post("http://localhost:8080/api/notes", newNote)
      .then((response) => {
        return response.status;
      })
}

export async function removeNote(noteId) {
  const response = await axiosInstance.delete(`/api/notes/${noteId}`);
  return response.status;
}

export async function updateNote(noteId, title, content) {
  const updatedNote = {
      title: title,
      content: content
    }
  return await axiosInstance
    .put(`http://localhost:8080/api/notes/${noteId}`, updatedNote)
    .then((response) => {
      return response.status;
    })
}

export async function login(email, password) {
  const loginDetails = {
    email: email,
    password: password,
  };
  console.log(loginDetails);
  return await axiosInstance
    .post("http://localhost:8080/api/auth/authenticate", loginDetails)
    .then((response) => {
      console.log(response);
      return response;
    });
}

export async function register(email, password) {
  const registerDetails = {
    email: email,
    password: password,
  };
  console.log(registerDetails);
  return await axiosInstance
    .post("http://localhost:8080/api/auth/register", registerDetails)
    .catch((error) => {
      return error.response;
    })
    .then((response) => {
      console.log(response);
      return response;
    });
}