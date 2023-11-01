import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).authToken
      }`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const addAdmin = (userInfo) =>
  api.post(`api/admin/register`, userInfo);
  export const loginAdmin = (userInfo) => api.post(`api/admin/login`, userInfo);


export const loginUser = (userInfo) => api.post(`api/user/login`, userInfo);
export const registerUser = (userInfo) => api.post(`api/user/register`, userInfo);
export const getUser = () => api.get(`api/user/users`);

export const addCourse = (courseInfo) => {
    return api.post(`api/admin/createCourse`, courseInfo);
  };
  export const getCourse = () => api.get(`api/admin/courses`);

  export const addSection = (sectionInfo) => {
    return api.post(`api/admin/createSection`, sectionInfo);
  };

  export const getSectionById = (courseId) => api.get(`api/admin/sections/${courseId}`);